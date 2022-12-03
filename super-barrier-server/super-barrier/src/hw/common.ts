import { Vector3 } from "./base";
import { RingBuffer } from "../misc";
import { createGoogleMapApiLoader } from "./_loader";

export const BT_ACC_SERVICE_UUID = "b1ea00ed-3b42-4f3e-8aee-f772a3b5d726";
export const BT_ACC_X_CHARACTERISTIC_UUID =
  "a76d6c6c-d397-4f1b-b79e-494e45e06cab";
export const BT_ACC_Y_CHARACTERISTIC_UUID =
  "133457b2-8a8a-4e93-9ee0-7f2c4c91cffb";
export const BT_ACC_Z_CHARACTERISTIC_UUID =
  "0c18438d-a513-4b26-b0c2-ae776556f3ce";

/**
 * State manager about sleep of SuperBarrier.
 */
export class SuperBarrierSleptManager {
  private slept: boolean;
  private lastUpdated: Date;
  private placeService: google.maps.places.PlacesService | null;
  private accelerationBuffer: RingBuffer<Vector3>;
  private updateFrequencyMs: number = 1 * 60 * 1000;

  constructor() {
    this.slept = false;
    this.lastUpdated = new Date();
    this.placeService = null;
    this.accelerationBuffer = new RingBuffer(1000);

    // Init google.map api
    createGoogleMapApiLoader()
      .load()
      .then((google) => {
        const map = new google.maps.Map(
          // document.getElementById("map") as HTMLElement
          document.createElement("div")
        );
        this.placeService = new google.maps.places.PlacesService(map);
      });
  }

  /**
   * Set update frequency.
   * @param ms Update frequency in milliseconds.
   */
  setUpdateFrequency(ms: number): void {
    this.updateFrequencyMs = ms;
  }

  /**
   * Check device is slept or not.
   * @returns If true, the device is sleeping.
   */
  isSlept(): boolean {
    return this.slept;
  }

  /**
   * Check hitting the device by statistical test using chi-square distribution.
   * @param acceleration Sensor value of acceleration.
   * @returns If true, detected hitting the device.
   */
  checkHitting(acceleration: Vector3): boolean {
    this.accelerationBuffer.push(acceleration);
    const [accSum, accSquareSum] = this.accelerationBuffer.reduce<
      [Vector3, Vector3]
    >(
      (cur, totals) => {
        const [total, squaredTotal] = totals;

        total.x += cur.x;
        total.y += cur.y;
        total.z += cur.z;
        squaredTotal.x += cur.x * cur.x;
        squaredTotal.y += cur.y * cur.y;
        squaredTotal.z += cur.z * cur.z;

        return [total, squaredTotal];
      },
      [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]
    );
    const accAvg = {
      x: accSum.x / this.accelerationBuffer.length,
      y: accSum.y / this.accelerationBuffer.length,
      z: accSum.z / this.accelerationBuffer.length,
    };
    const accVar = {
      x: accSquareSum.x / this.accelerationBuffer.length - accAvg.x * accAvg.x,
      y: accSquareSum.y / this.accelerationBuffer.length - accAvg.y * accAvg.y,
      z: accSquareSum.z / this.accelerationBuffer.length - accAvg.z * accAvg.z,
    };

    const anomalousX = (this.accelerationBuffer.length * accVar.x) / accAvg.x;
    const anomalousY = (this.accelerationBuffer.length * accVar.y) / accAvg.y;
    const anomalousZ = (this.accelerationBuffer.length * accVar.z) / accAvg.z;

    // Detecting 1%-tile outlier
    return anomalousX > 6.64 || anomalousY > 6.64 || anomalousZ > 6.64;
  }

  isElaspedToLastUpdate(now: Date): boolean {
    const elaspedMs = now.getTime() - this.lastUpdated.getTime();
    return elaspedMs < this.updateFrequencyMs;
  }

  /**
   * Update state of the hardware.
   * @param latitude Latitude of the location.
   * @param longitude Longitude of the location.
   */
  async update(
    latitude: number,
    longitude: number,
    acceleration: Vector3
  ): Promise<void> {
    // Check hitting device.
    if (this.checkHitting(acceleration)) {
      this.slept = false;
      return;
    }

    // Check device location using Google.Map API.
    const now = new Date();
    if (this.isElaspedToLastUpdate(now)) {
      //  Check every 1 minutes
      return;
    }

    this.lastUpdated = now;
    return new Promise<void>((resolve) => {
      // Search nearest sacret place asynchronously.
      this.placeService &&
        this.placeService.nearbySearch(
          {
            location: new google.maps.LatLng(latitude, longitude),
            radius: 20,
            type: "place_of_worship",
          },
          (results) => {
            // Finished to search sacred locations.
            if (!!results && results.length > 0) {
              this.slept = true;
            }
            resolve();
          }
        );
    });
  }
}

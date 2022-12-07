import { Vector3 } from "./base";
import { RingBuffer } from "../misc";
import { isNearBySacret } from "../application";

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
  private accelerationBuffer: RingBuffer<Vector3>;
  private updateFrequencyMs: number;
  private searchingRadius: number;

  constructor(searchingRadius = 20, updateFrequencyMs = 1 * 60 * 1000) {
    this.slept = false;
    this.lastUpdated = new Date();
    this.accelerationBuffer = new RingBuffer(1000);
    this.updateFrequencyMs = updateFrequencyMs;
    this.searchingRadius = searchingRadius;
  }

  /**
   * Set update frequency.
   * @param ms Update frequency in milliseconds.
   */
  setUpdateFrequency(ms: number): void {
    this.updateFrequencyMs = ms;
  }

  /**
   * Check whether the device is slept or not.
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
      // Calculate statistical metrics.
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

  /**
   * Check whether the time is elapsed to last update.
   * @param now Current time.
   * @returns If true, elasped to last update.
   */
  isElaspedFromLastUpdated(now: Date = new Date()): boolean {
    const elaspedMs = now.getTime() - this.lastUpdated.getTime();
    return elaspedMs > this.updateFrequencyMs;
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
    // Check whether hitting device.
    if (this.checkHitting(acceleration)) {
      this.slept = false;
      return;
    }

    // Check whether device location using Google.Map API.
    const now = new Date();
    if (!this.isElaspedFromLastUpdated(now)) {
      //  Check every 1 minutes
      return;
    }

    // Check whether the device location near by sacred place.
    this.lastUpdated = now;
    if (await isNearBySacret(latitude, longitude, this.searchingRadius)) {
      this.slept = true;
      return;
    }
  }
}

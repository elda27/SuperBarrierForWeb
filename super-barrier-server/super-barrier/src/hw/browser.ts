import { ImuStatus, Location, SuperBarrier, SuperBarrierState } from "./base";
import {
  BT_ACC_SERVICE_UUID,
  BT_ACC_X_CHARACTERISTIC_UUID,
  BT_ACC_Y_CHARACTERISTIC_UUID,
  BT_ACC_Z_CHARACTERISTIC_UUID,
  SuperBarrierSleptManager,
} from "./common";

// const UUID_GNSS_SERVICE: number = parseInt("0x1136", 16);
// const UUID_IMU_SERVICE: string = "761a5f72-5ccf-11ed-9b6a-0242ac120002";

export class WebBlueetoothSuperBarrier implements SuperBarrier {
  device?: BluetoothDevice;
  state?: SuperBarrierState;
  sleptManager: SuperBarrierSleptManager;

  constructor() {
    this.sleptManager = new SuperBarrierSleptManager();
  }

  /**
   * Update state of the hardware.
   */
  async update(): Promise<void> {
    // update IMU state
    let imuStatus: ImuStatus | undefined = undefined;
    const imuService = await this.device?.gatt?.getPrimaryService(
      BT_ACC_SERVICE_UUID
    );
    if (imuService) {
      const accX =
        (
          await imuService.getCharacteristic(BT_ACC_X_CHARACTERISTIC_UUID)
        ).value?.getFloat64(0) || 0.0;
      const accY =
        (
          await imuService.getCharacteristic(BT_ACC_Y_CHARACTERISTIC_UUID)
        ).value?.getFloat64(0) || 0.0;
      const accZ =
        (
          await imuService.getCharacteristic(BT_ACC_Z_CHARACTERISTIC_UUID)
        ).value?.getFloat64(0) || 0.0;
      imuStatus = {
        acceleration: {
          x: accX,
          y: accY,
          z: accZ,
        },
      };
    }
    // Get location service
    const locationServiceResult = new Promise<[boolean, Location]>(
      (resolver) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const location: Location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            z: position.coords.altitude || 0.0,
          };
          this.sleptManager.update(
            position.coords.latitude,
            position.coords.longitude
          );
          resolver([this.sleptManager.isSlept(), location]);
        });
      }
    );

    const [isSlept, location] = await locationServiceResult;
    this.state = {
      power: 0, // TODO: get rssi from device,
      isSlept: isSlept,
      readyConnected: this.isConnected(),
      location: location,
      imuStatus: imuStatus,
    };
  }

  /**
   * Negotiate connection with the hardware.
   */
  async connect(): Promise<boolean> {
    const bluetoothAvailable = this._negoatiateConnectionBluetooth();
    const gpsServiceAvailable = this._negotiateGpsService();
    return (await bluetoothAvailable) && (await gpsServiceAvailable);
  }

  async _negotiateGpsService(): Promise<boolean> {
    // Check available geolocation service.
    if (!navigator.geolocation) {
      return false;
    }

    return new Promise<boolean>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          resolve(true);
        },
        () => {
          console.error(
            "Failed to get current position." +
              "pelase check a permission about gps service or your device."
          );
          resolve(false);
        }
      );
    });
  }

  async _negoatiateConnectionBluetooth(): Promise<boolean> {
    // Ask user to allow the bluetooth permission.
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [] }],
    });
    if (!device) {
      console.error(
        "Failed to connect a devicew. " +
          "please check a permission about bluetooth or your device."
      );
      return false;
    }

    // Negotiate connection with the hardware.
    const gattServer = await device.gatt?.connect();
    if (!gattServer) {
      console.error(`Invalid device: ${device.name} (${device.id}).`);
      return false;
    }

    return gattServer.connected; // If connected return true.
  }

  /**
   * Check connection with the hardware.
   */
  isConnected(): boolean {
    return this.device?.gatt?.connected ?? false;
  }

  /**
   * Disconnect from the hardware.
   */
  async disconnect(): Promise<void> {
    if (this.isConnected()) {
      this.device?.gatt?.disconnect();
    }
  }

  /**
   * Get SuperBarrier state.
   */
  getState(): SuperBarrierState {
    return (
      this.state || {
        power: 0,
        readyConnected: false,
        isSlept: false,
      }
    );
  }
}

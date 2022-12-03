export interface Location {
  latitude: number;
  longitude: number;
  z: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface ImuStatus {
  acceleration?: Vector3;
  angularVelocity?: Vector3;
  azimuth?: Vector3;
}

export interface SuperBarrierState {
  power: number; // Amplitude of SuperBarrier 0-100
  readyConnected: boolean;
  isSlept: boolean;
  divinePower?: number;
  location?: Location;
  imuStatus?: ImuStatus;
}

export interface SuperBarrier {
  /**
   * Negotiate connection with the hardware.
   */
  connect(): Promise<boolean>;
  /**
   * Disconnect from the hardware.
   */
  disconnect(): Promise<void>;
  /**
   * Check connection with the hardware.
   */
  isConnected(): boolean;
  /**
   * Update state of the hardware.
   */
  update(): Promise<void>;
  /**
   * Get SuperBarrier state.
   */
  getState(): SuperBarrierState | null;
}

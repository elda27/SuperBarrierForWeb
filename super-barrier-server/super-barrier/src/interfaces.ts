export interface DeviceStatus {
  isConnected: boolean;
  isSlept?: boolean;
  rssi?: number;
  battery?: number;
}

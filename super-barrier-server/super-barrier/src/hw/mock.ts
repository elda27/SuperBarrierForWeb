import { SuperBarrier, SuperBarrierState } from "./base";

export class MockSuperBarrier implements SuperBarrier {
  private state?: SuperBarrierState;
  constructor(state?: SuperBarrierState) {
    this.state = state;
  }
  /**
   * Update state of the hardware.
   */
  async update(): Promise<void> {
    // Do nothing
  }
  /**
   * Negotiate connection with the hardware.
   */
  async connect(): Promise<boolean> {
    return this.isConnected();
  }
  /**
   * Check connection with the hardware.
   */
  isConnected(): boolean {
    return !!this.state;
  }
  /**
   * Disconnect from the hardware.
   */
  async disconnect(): Promise<void> {
    this.state = undefined;
  }
  /**
   * Get SuperBarrier state.
   */
  getState(): SuperBarrierState | null {
    return this.state ?? null;
  }
}

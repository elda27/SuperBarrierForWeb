import { jest, test, expect } from "@jest/globals";
import * as application from "../application";
import { SuperBarrierSleptManager } from "./common";

jest.useFakeTimers();

test("SuperBarrierSleptManager", async () => {
  const mockIsNearBySacret = jest.spyOn(application, "isNearBySacret");
  mockIsNearBySacret.mockResolvedValue(false);
  const manager = new SuperBarrierSleptManager();

  expect(manager.isElaspedFromLastUpdated()).toBe(false);

  // Fill buffer
  for (let i = 0; i < 1000; i++) {
    await manager.update(135, 0.0, { x: 0, y: 0, z: 0 });
  }

  // wait until checking current location.
  manager.setUpdateFrequency(10);
  jest.advanceTimersByTime(50);

  expect(manager.isElaspedFromLastUpdated()).toBe(true);

  // Check initial state
  expect(manager.isSlept()).toBe(false);

  // Check slept state
  mockIsNearBySacret.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
  await manager.update(136.433329, 34.271561, { x: 0, y: 0, z: 0 }); // Ise Grand shline
  expect(manager.isSlept()).toBe(true);

  // Check waking up.
  await manager.update(136.433329, 0.0, { x: 1000, y: 0, z: 0 }); // Hitting
  expect(manager.isSlept()).toBe(false);
});

import { jest, test, expect } from "@jest/globals";
import * as google_mock from "@googlemaps/jest-mocks";
import { SuperBarrierSleptManager } from "./common";

import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;

// class DummyApiLoader {
//   load(): Promise<unknown> {
//     return new Promise((resolve) => resolve({ maps: google_mock }));
//   }
// }

// jest.mock("./_loader", () => {
//   const originalModule = jest.requireActual(
//     "./_loader"
//   ) as typeof import("./_loader");
//   return {
//     __esModule: true,
//     ...originalModule,
//     createGoogleMapApiLoader: () => new DummyApiLoader(),
//   };
// });

beforeAll(() => {
  google_mock.initialize();
});

beforeEach(() => {
  google_mock.mockInstances.clearAll();
});

test("SuperBarrierSleptManager", async () => {
  const manager = new SuperBarrierSleptManager();

  // Fill buffer
  for (let i = 0; i < 1000; i++) {
    await manager.update(135, 0.0, { x: 0, y: 0, z: 0 });
  }

  // wait until checking current location.
  manager.setUpdateFrequency(10);
  jest.advanceTimersByTime(50);

  expect(manager.isElaspedToLastUpdate(new Date())).toBe(true);

  // Check initial state
  expect(manager.isSlept()).toBe(false);

  // Check slept state
  await manager.update(136.433329, 34.271561, { x: 0, y: 0, z: 0 }); // Ise Grand shline
  expect(manager.isSlept()).toBe(true);

  // Check waking up.
  await manager.update(136.433329, 0.0, { x: 1000, y: 0, z: 0 }); // Hitting
  expect(manager.isSlept()).toBe(false);
});

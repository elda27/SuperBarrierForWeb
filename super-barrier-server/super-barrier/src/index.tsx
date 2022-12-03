import * as React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App tab="home" />);
} else {
  console.log("Failed to mount app.");
}

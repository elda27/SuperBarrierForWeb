import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.createElement("div");
container.setAttribute("id", "app-super-barrier");
document.body.appendChild(container);
// const container = document.getElementById("app");
if (container) {
  console.log("Succeeded to mount app.");
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
} else {
  console.log("Failed to mount app.");
}

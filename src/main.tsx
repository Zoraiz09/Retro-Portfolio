import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Easter egg for the curious dev who cracks open the console.
console.log(
  "%c ZORAIZ.SYS %c booted ✦",
  "background:#FF5C46;color:#F4F1E8;font-weight:900;padding:4px 8px;border-radius:2px;font-family:monospace;",
  "color:#16140F;font-family:monospace;",
);
console.log(
  "%cHey, you're poking around the internals. I like that.\n%cPress  /  to open the command terminal. Try 'help', 'matrix', or the Konami code (↑↑↓↓←→←→ B A).\nLooking for someone who reads the source? Run 'social' in the terminal.",
  "color:#E23E22;font-family:monospace;font-weight:bold;",
  "color:#15323F;font-family:monospace;",
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

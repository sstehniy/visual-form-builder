import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateProvider } from "./components/state/StateProvider";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);

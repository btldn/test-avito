import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AdsProvider } from "./data/AdsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdsProvider>
  </React.StrictMode>
);
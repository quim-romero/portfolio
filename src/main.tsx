import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { registerServiceWorker } from "./registerSW";
import { LanguageProvider } from "./hooks/LanguageProvider";
import { DarkModeProvider } from "./hooks/DarkModeContext";

import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            <DarkModeProvider>
              <App />
            </DarkModeProvider>
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  registerServiceWorker();
} else {
  console.error("Element #root not found");
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./hooks/DarkModeContext";
import { LanguageProvider } from "./hooks/LanguageProvider";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <DarkModeProvider>
      <StrictMode>
        <App />
      </StrictMode>
      ,
    </DarkModeProvider>
  </LanguageProvider>
);

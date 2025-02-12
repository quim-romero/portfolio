import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./hooks/DarkModeContext";

createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </DarkModeProvider>
);

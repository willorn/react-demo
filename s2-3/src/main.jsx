import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 先找到HTML里的毛坯房坑位（id="root"）
createRoot(document.getElementById("root")).render(
  // 把(App组件)塞进去
  <StrictMode>
    <App />
  </StrictMode>,
);

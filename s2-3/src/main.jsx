import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * 渲染根元素
 *
 * 1. document.getElementById("root")：
 *    从 index.html 中找到 id 为 "root" 的 DOM 节点，
 *    它是 React 应用的挂载点（容器）。
 *
 * 2. createRoot(...)：
 *    React 18 的新 API，用于创建一个根渲染器（Root）。
 *    它负责管理这个 DOM 节点下的整个 React 组件树。
 *    相比 React 17 的 ReactDOM.render，createRoot 支持并发特性，
 *    性能更好，也是官方推荐的新写法。
 *
 * 3. .render(...)：
 *    把 React 元素渲染到上面创建的 Root 中。
 *    这里渲染的是 <App /> 组件，外层包裹 <StrictMode>。
 *
 * 4. <StrictMode>：
 *    React 的严格模式组件，仅在开发环境下生效。
 *    它会故意双重调用某些函数、检查废弃 API 等，
 *    帮助开发者提前发现潜在问题。
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

# react-demo

这是一个按练习目录拆分的前端学习仓库，里面同时包含：

- 直接用 `html + css + js` 写的小练习
- 用 `React + Vite + pnpm` 写的阶段性练习
- 一个相对完整的 `final-weather-app`

这个仓库更像 Java 学习时的“多模块练习集合”，不是一个只有单一入口的完整项目。所以运行时要进入具体目录分别启动。

## 目录说明

### 纯前端基础练习

- `section1/`
- `s1-5/`
- `1-challenge-circle/`
- `2-challenge-todo/`

这几个目录主要是原生前端练习，可以直接用浏览器打开 `index.html`，也可以用任意静态服务工具启动。

### React 练习

- `s2-3/`
  一个 Todo List 练习，重点是 `useState`、列表渲染、事件处理。
- `s2-4/`
  一个输入框拆组件练习，重点是 `props` 和受控输入框。
- `3-challenge-circle2/`
  一个拆分多个 React 组件的小练习。
- `s2-8/`
  一个 Advice App，重点是 `SWR` 的远程数据获取。
- `s2-10cleanup/`
  在 Advice App 基础上增加了自定义 Hook `useCurrentTime`，重点是复用逻辑和 cleanup 场景。
- `final-weather-app/`
  一个天气应用，重点是 `custom hooks`、定位、异步请求、组件拆分。

## 环境准备

这个仓库里的 React 应用都使用 `pnpm` 管理依赖。

建议准备：

- Node.js 20+
- pnpm

官方文档：

- pnpm 安装文档: <https://pnpm.io/installation>
- Vite 官方指南: <https://vite.dev/guide/>
- React 官方学习文档: <https://react.dev/learn>

## 如何运行

### 运行原生前端练习

直接打开对应目录下的 `index.html` 即可。

如果你更想接近“应用启动”的感觉，也可以在仓库根目录执行静态服务，例如：

```bash
pnpm dlx serve .
```

然后在浏览器里访问对应目录。

### 运行 React 练习

React 练习没有做成根目录 workspace，所以要进入各自目录单独安装和启动。

例如运行 `s2-4`：

```bash
cd s2-4
pnpm install
pnpm dev
```

其他几个 React 目录也是同样的方式：

```bash
cd s2-3
pnpm install
pnpm dev
```

```bash
cd s2-8
pnpm install
pnpm dev
```

```bash
cd s2-10cleanup
pnpm install
pnpm dev
```

```bash
cd 3-challenge-circle2
pnpm install
pnpm dev
```

### 运行天气应用

`final-weather-app` 依赖 OpenWeather API，需要先准备环境变量。

先进入目录：

```bash
cd final-weather-app
pnpm install
```

然后创建 `.env.local`：

```bash
VITE_API_URL=https://api.openweathermap.org/data/2.5
VITE_API_KEY=你的_openweather_api_key
```

再启动：

```bash
pnpm dev
```

如果浏览器弹出定位授权，请允许，否则天气应用无法拿到当前位置。

## 给 Java 程序员的 React 概念对照

这一部分尽量按 React 官网的说法来理解，不自己发明术语。

### 1. component

React 官网把组件理解为 UI 的基本构建单元。

- React 文档: <https://react.dev/learn/describing-the-ui>
- Java 类比: 很像一个“负责输出界面的类/模板单元”

不过要注意，React 组件本质上通常是函数，不是 Java 里的 class。你可以先把它理解成：

- 输入 `props`
- 返回 JSX

这有点像 Java 里的：

- 方法参数进来
- 方法返回一个“界面描述结果”

### 2. props

`props` 是父组件传给子组件的数据。

- React 文档: <https://react.dev/learn/passing-props-to-a-component>
- Java 类比: 很像方法参数，或者调用方传入的 DTO

比如 `s2-4/src/App.jsx` 里把 `value`、`type`、`setValue` 传给 `AppInput`，本质上就是父组件在给子组件传参。

### 3. state

`state` 是组件自己管理的、会随着交互变化的数据。

- React 文档: <https://react.dev/learn/state-a-components-memory>
- Java 类比: 很像一个对象实例里的可变字段

例如：

- `username`
- `password`
- `todoList`

这些都不是写死常量，而是“用户操作以后会变化的数据”。

### 4. derive state

React 官网在“Choosing the State Structure”里强调，不要保存可以从已有数据推导出来的重复状态。

- React 文档: <https://react.dev/learn/choosing-the-state-structure>
- Java 类比: 更像根据现有字段临时计算一个 getter 结果，而不是再额外存一个重复字段

比如：

- 不要既保存 `firstName`、`lastName`
- 又再保存一份 `fullName`

更合理的做法是需要时再拼出来。这个思路和 Java 里“能算出来的值就不要冗余存库/存字段”很像。

### 5. event handler

点击按钮、输入内容时，React 会执行事件处理函数。

- React 文档: <https://react.dev/learn/responding-to-events>
- Java 类比: 很像按钮监听器、回调函数

例如 `onClick={addItem}`，本质上就是“按钮点击后执行一段逻辑”。

### 6. effect

React 官网对 `Effect` 的定义是：让组件去和外部系统同步。

- React 文档: <https://react.dev/learn/synchronizing-with-effects>
- Java 类比: 不像普通 getter，更像“状态变化后触发一次外部同步逻辑”

例如：

- 发请求
- 操作浏览器 API
- 订阅/取消订阅
- 定时器

在 `final-weather-app/src/App.jsx` 里首次加载天气的逻辑，就是一个比较典型的 `useEffect` 使用场景。

### 7. custom hook

React 官网把 Hook 理解为“复用带状态逻辑的方式”。

- React 文档: <https://react.dev/learn/reusing-logic-with-custom-hooks>
- Java 类比: 可以先近似理解成“把一套可复用的状态逻辑提炼成一个专门的方法模块”

比如：

- `useGeolocation`
- `useCurrentWeather`
- `useForecast`
- `useCurrentTime`

它们不是普通工具函数，因为里面不只是纯计算，还会持有状态、调 Hook、组织副作用。

## 这个仓库里值得优先关注的目录

如果你现在的目标是学 React，我建议按这个顺序看：

1. `s2-4`
2. `s2-3`
3. `3-challenge-circle2`
4. `s2-8`
5. `s2-10cleanup`
6. `final-weather-app`

这个顺序比较像 Java 学习时：

1. 先学方法传参
2. 再学对象状态变化
3. 再学拆分类和复用
4. 再学调用外部接口
5. 最后学把逻辑拆成更清晰的模块

## 当前已发现的严重问题

下面两个问题会直接影响运行，不属于“代码风格问题”，而是实打实会报错的问题：

### 1. `s2-3` 删除按钮会报错

`s2-3/src/App.jsx` 里按钮调用了 `deleteItem(item)`，但文件里没有定义 `deleteItem` 函数。

结果：

- 页面能打开
- 但是点击 `delete` 按钮会直接抛出运行时错误

### 2. `s2-10cleanup` 首次渲染可能报错

`s2-10cleanup/src/App.jsx` 里写的是：

```jsx
data.slip?.advice
```

首次请求还没返回时，`data` 很可能是 `undefined`，这时访问 `data.slip` 会直接报错。

更安全的写法通常应当是：

```jsx
data?.slip?.advice
```

## 后续如果要追求 best practice

现阶段这个仓库以“先跑起来”为主，这没有问题。

如果后面要逐步往更稳的方向走，可以再考虑这些事情：

- 给每个 React 练习补最基本的错误处理
- 给天气应用补 `.env.example`
- 把根目录整理成真正的 `pnpm workspace`
- 给每个小节写独立 README
- 把运行时错误先清掉，再谈代码风格优化

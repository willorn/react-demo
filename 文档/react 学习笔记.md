> 把 React 的基础开发流程跑通了，包括状态、事件绑定、列表渲染、组件拆分、Hook、useEffect、SWR 数据请求，以及基于 Vite 和 pnpm 的项目组织与开发方式；但 React 进阶部分还没系统学习，后面还需要继续补路由和全局状态管理。

## 状态与事件

### 什么是状态

- 还是不懂，为什么我们需要这样的一个状态变量去完成这个修改呢？直接用 let 变量不行吗
  - **React 不会因为你修改了一个普通变量就去重新渲染 UI**。
  - useState 的本质不是"存一个值"，而是"**让这个值和组件的生命周期绑定，变化时触发重新渲染**"。
  - 普通变量修改不会触发React界面刷新，必须用状态变量

- React事件绑定采用 `onEventName` 并传入事件处理器函数
  1. 利用React的 `onChange` 事件和事件处理器捕获输入变动。
  2. 使用 `useState` 创建响应式状态变量，保存输入值。
  3. 调用状态更新函数修改状态，触发组件重新渲染。
  4. 在JSX中以花括号引用状态变量显示数据，实现视图同步更新。

| 概念                       | 描述                         | 作用                       |
| -------------------------- | ---------------------------- | -------------------------- |
| 事件处理器 (Event Handler) | 绑定到元素事件的函数         | 捕获用户操作，执行响应逻辑 |
| useState                   | React Hook，创建响应式状态   | 更新状态并驱动UI重新渲染   |
| 状态变量                   | 保存组件状态的变量           | 保存数据，绑定视图展示     |
| JSX花括号                  | 在元素中嵌入JavaScript表达式 | 动态渲染状态数据           |

**事件绑定流程**

- 用户在 `input` 中输入触发 `onChange` 事件
- React调用绑定的事件处理器函数 `handleChange`
- 事件处理器从 `event.target.value` 获取输入值
- 调用状态更新函数 `setInputText` 修改状态
- React检测状态变化，重新渲染相关组件

#### 衍生状态（Derived State）

**动态 className 绑定**和**衍生状态（derived state）** 实现输入框的实时校验与样式切换

- derived state --> computed
- 定义 **derived state** ，实现基于状态变量的实时动态计算

### 列表渲染

- 列表&条件：我们用到列表的时候，一般也会用到一个东西叫做 key。官方文档里面有写到“Why we need key in list”，就是有了 key，就能唯一地标记列表中的某个元素，从而保证它们的排序。

### 副作用与数据请求

- `useEffect` 用于组件初次渲染副作用
  - effect中使用异步函数
    - React 官方推荐写法正是“**在 effect 里面再定义一个 async 函数，然后调用它**”
    - [https://react.dev/reference/react/useEffect#reference](https://react.dev/reference/react/useEffect#reference)
- `useSWR`
  - 使用 SWR 的示例代码非常简洁。只需导入 `useSWR`，传入请求接口和 fetch 函数，SWR 就会返回 `data`、`error` 和 `isLoading` 三个状态。我们用 `data` 作为后端返回数据，`isLoading` 控制加载状态，无需再写繁杂的 useState 和 useEffect。这不仅使代码简洁，还减少了人为出错的可能。
  - 让 Axios 负责发请求（还能加拦截器、统一错误处理），让 React Query/SWR 负责管理返回的数据和状态。
  - **React Query：** 功能丰富，适合对缓存与状态管理有高需求的项目。
  - **SWR：** 简单易用，推荐新手和想快速实现高效数据请求的场景。

- **useSWRMutation** 替代传统的手动请求管理，实现按钮请求的触发控制与状态管理
  - Mutation: _to change from one thing or type of thing into another_
  - 虽然 **useSWR** 自动发起数据请求，但它并不适合需要通过用户按钮主动触发请求的场景。针对这一需求，**useSWRMutation** 提供了更优解，允许用户手动触发请求，同时内置了 **isMutating** 状态，方便管理加载过程。
  - _useSWRMutation_ 会返回一个 **trigger** 函数，可接受自定义参数（如纬度、经度），这些参数会传递到 fetcher 中执行请求逻辑。按钮点击时调用此 **trigger** 并赋值 **isMutating**，根据此状态禁用按钮，避免重复多次请求。

#### SWR 自动管理的不是“一个 loading”，而是两类请求状态

- **stale-while-revalidate** 翻译成人话就是： **“先用旧（stale）的顶着，同时（while）去验证（revalidate）新的”** 。
  - isLoading ：首次请求且当前还没有数据时为 true
  - isValidating ：只要当前正在请求，就可能为 true ，包括首次请求和后续刷新请求

- 首次页面加载 ，适合用 isLoading
- 点击按钮重新获取数据 ，更适合看 isValidating

## 组件

### 组件基础

- React components are JavaScript functions that return markup
  - React 组件就是返回标记语言的 JavaScript 函数
  - children 组件：是 React 组件的一个特殊内置 prop。当你在 JSX 中使用双标签写法 `<Component>...</Component>` 时，**所有位于起始标签和结束标签之间的内容（文本、HTML元素、其他组件等）都会自动被收集为一个 `children` prop 传递给该组件**。
  - children 不局限于“属性/传值”，而是**直接包裹真实 UI 片段**，支持复杂组合

### 项目迁移与兼容性

- 很多人只复制代码，然后直接运行，发现报错才去修。
  - 更好的做法是：先阅读新项目的模板文档，了解默认配置；然后逐步添加旧代码，每添加一部分就测试一次。特别留意第三方库的引入方式（比如 Vite 不支持 `require`，需要用 `import` 或 `await import()`）。另外，迁移后要检查开发服务器和生产的构建是否都正常，因为 Vite 生产构建可能和开发环境有差异。

### 条件显示与 Activity

- React 19.2 Activity 组件
  - 解决：条件不满足的时候组件会被 **卸载**问题
  - 该组件类似于条件渲染的中间层容器，所有需要条件控制显示隐藏的子组件包裹其中。区别于传统条件渲染直接卸载组件，Activity 组件通过修改 CSS `display` 属性实现组件的显示或隐藏，但不会卸载组件本身。

### 自定义 Hook

**自定义 Hook 命名规范**

- 以 `use` 开头
- 名称明确反映业务含义（如 `useTime`）
- 与文件名一致（方便维护）
- 符合 React 官方约定

## 工程化与工具

### 包管理与开发环境

- [https://pnpm.io/zh/](https://pnpm.io/zh/)

- `"packagemanager": "pnpm@10.27.0",`
- [https://nodejs.org/en/download](https://nodejs.org/en/download) 这里很好，现在都开始统一用 nvm 管理版本了
- 用的都是同一个镜像源

```bash
#查询当前使用的镜像源
npm get registry

#设置为淘宝镜像源
npm config set registry https://registry.npmmirror.com/

#验证设置
npm get registry

#还原为官方源
npm config set registry https://registry.npmjs.org/
```

### Vite 使用技巧

- medium博客: [https://fadamakis.com/a-front-end-application-folder-structure-that-makes-sense-ecc0b690968b](https://fadamakis.com/a-front-end-application-folder-structure-that-makes-sense-ecc0b690968b)
  - 应按功能拆分目录，将 UI 组件和功能逻辑组件分开
  - 通用组件不应关心具体事件处理，事件逻辑应由父组件控制
- 路径别名 `@`
  - 修改 `vite.config.js`，添加 **resolve.alias**，设置 `@` 指向 `src`。
  - 在项目中将相对路径替换为别名路径进行导入。
  - 添加 `jsconfig.json` 文件，配置 `baseUrl` 和 `paths`，告诉编辑器别名规则。
  - 重启 VS Code，路径别名跳转功能恢复。

## 状态与事件

- 还是不懂，为什么我们需要这样的一个状态变量去完成这个修改呢？直接用 let 变量不行吗
  - React 不会因为你修改了一个普通变量就去重新渲染 UI。
  - useState 的本质不是"存一个值"，而是"让这个值和组件的生命周期绑定，变化时触发重新渲染"。
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

### derived state

**动态 className 绑定**和**衍生状态（derived state）** 实现输入框的实时校验与样式切换

- derived state --> computed
- 定义 **derived state** ，实现基于状态变量的实时动态计算

### e.target.value 是什么？

- 关键在这里：React 的 onChange 要的不是“执行结果”，而是“一个等会儿能调用的函数”。
- e ：浏览器触发的事件对象（类似 Java 里的 ActionEvent ）
- e.target ：触发事件的那个 DOM 元素，这里就是 <select>
- e.target.value ：用户选中的那个 <option> 的 value

- 列表&条件：我们用到列表的时候，一般也会用到一个东西叫做 key。官方文档里面有写到“Why we need key in list”，就是有了 key，就能唯一地标记列表中的某个元素，从而保证它们的排序。
- React components are JavaScript functions that return markup
  - React 组件就是返回标记语言的 JavaScript 函数

-

react 项目推荐使用 pnpm [https://pnpm.io/zh/](https://pnpm.io/zh/)

- "packagemanager": "pnpm@10.27.0",
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

### SWR 自动管理的不是“一个 loading”，而是两类请求状态

- **stale-while-revalidate** 翻译成人话就是： **“先用旧（stale）的顶着，同时（while）去验证（revalidate）新的”** 。
- isLoading ：首次请求且当前还没有数据时为 true
- isValidating ：只要当前正在请求，就可能为 true ，包括首次请求和后续刷新请求
  因此：
- 首次页面加载 ，适合用 isLoading
- 点击按钮重新获取数据 ，更适合看 isValidating
-

vite 最佳实践

medium博客: https://fadamakis.com/a-front-end-application-folder-structure-that-makes-sense-ecc0b690968b

jsconfig.json

路径别名@

// TextColorSelect 是一个 React 函数组件
// 你可以把它类比成 Java 里一个只负责渲染 UI 的方法：接收参数，返回 JSX（类似 HTML 模板）
// props 就是方法的入参，这里用了解构语法，等价于：
// function TextColorSelect(props) { const { textColor, setTextColor } = props; ... }
function TextColorSelect({ textColor, setTextColor }) {
  return (
    <label>
      text color
      {/* select 是一个"受控组件"：
          value={textColor} 负责显示当前值（像 Java 中把模型值绑定到视图）
          onChange 是事件监听器，用户选择时调用 setTextColor 更新父组件状态
          这相当于 Java Swing 里的 JComboBox + ActionListener，只是写法更声明式 */}
      <select
        onChange={(event) => setTextColor(event.target.value)}
        value={textColor}
      >
        {/* value="" 对应 White，作为默认空值 */}
        <option value="">White</option>
        <option value="text-black">Black</option>
        <option value="text-orange">Orange</option>
      </select>
    </label>
  );
}

// 把这个组件作为默认导出，其他文件 import TextColorSelect from './TextColorSelect' 时就能用到
// 类似 Java 中 public class 可以被其他包引用
export default TextColorSelect;

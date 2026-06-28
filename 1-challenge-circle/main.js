/*
  1. Bind the input/select to the states
  2. Change the circle styles based on the states

  tips: circle size and rotate style:
  height: 0px,
  width: 0px,
  lineHeight: 0px,
  transform: `rotate(0deg)`,
*/

const { useState } = React;

function MyApp() {
  const [isPurple, setIsPurple] = useState(false); // 是否紫色, 默认不是
  const [textColor, setTextColor] = useState(""); // 文本颜色, 默认白
  const [circleSize, setCircleSize] = useState(150);
  const [circleRotate, setCircleRotate] = useState(0);
  const circleClass = isPurple ? "purple" : "";

  return (
    <main>
      <label>
        紫色
        <input
          type="checkbox"
          checked={isPurple}
          onChange={() => setIsPurple(!isPurple)}
        />
      </label>

      <label>
        文本颜色
        <select value={textColor} onChange={(e) => setTextColor(e.target.value)}>
          <option value="text-white" selected>
            White
          </option>
          <option value="text-black">Black</option>
          <option value="text-orange">Orange</option>
        </select>
      </label>

      <label>
        Circle Size
        <input type="number" value={circleSize} onChange={(e) => setCircleSize(e.target.value)} />
      </label>

      <label>
        Circle Rotate
        <input type="number" value={circleRotate} onChange={(e) => setCircleRotate(e.target.value)} />
        </label>
      <div
        className={`circle ${circleClass} ${textColor}`}
        style={{
          height: `${circleSize}px`,
          width: `${circleSize}px`,
          lineHeight: `${circleSize}px`,
          transform: `rotate(${circleRotate}deg)`,
        }}
      >
        Hi!
      </div>
    </main>
  );
}

const appEl = document.querySelector("#app");
const root = ReactDOM.createRoot(appEl);

root.render(<MyApp />);

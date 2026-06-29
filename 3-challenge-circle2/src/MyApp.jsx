import { useState } from "react";
import MyCircle from "./MyCircle.jsx";
import TogglePurple from "./TogglePurple.jsx";
import TextColorSelect from "./TextColorSelect.jsx";

import "./MyApp.css";

function MyApp() {
  const [isPurple, setIsPurple] = useState(false);
  const [textColor, setTextColor] = useState("");

  const [size, setSize] = useState(150);
  const [rotate, setRotate] = useState(0);

  return (
    <main>
      <TogglePurple isPurple={isPurple} setIsPurple={setIsPurple} />
      <TextColorSelect textColor={textColor} setTextColor={setTextColor} />

      <label>
        Circle Size
        <input
          type="number"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </label>

      <label>
        Circle Rotate
        <input
          type="number"
          value={rotate}
          onChange={(event) => setRotate(event.target.value)}
        />
      </label>
      <MyCircle
        isPurple={isPurple}
        textColor={textColor}
        size={size}
        rotate={rotate}
      />
    </main>
  );
}

export default MyApp;

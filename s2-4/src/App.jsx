import { useState } from "react";
import "./App.css";
import "./style.css";
import AppInput from "./AppInput";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Hello React 18!</h1>
      username:{" "}
      <AppInput
        type="text"
        value={username}
        setValue={setUsername}
        onChange={setUsername}
      />
      password:{" "}
      <AppInput
        type="password"
        value={password}
        setValue={setPassword}
        onChange={setPassword}
      />
    </div>
  );
}

export default App;

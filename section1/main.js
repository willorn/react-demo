const { useState } = React;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameClass =
    username.length > 0 && username.length <= 2
      ? "login-input input-error"
      : "login-input";

  const passwordClass =
    password.length > 0 && password.length <= 2
      ? "login-input input-error"
      : "login-input";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    if (
      (username.length > 0 && username.length <= 2) ||
      (password.length > 0 && password.length <= 2)
    ) {
      alert("用户名或密码长度不能小于等于 2");
      return;
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login Form</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className={usernameClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="请输入 username"
          />

          <input
            className={passwordClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="请输入 password"
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

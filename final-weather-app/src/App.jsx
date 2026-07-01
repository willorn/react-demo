import Container from "./components/Container";
import Forecast from "./components/Forecast";
import Home from "./components/Home";
import useGeolocation from "./hooks/useGeolocation.js";

function App() {
  // 获取位置信息
  const { getPosition } = useGeolocation();

  return (
    <Container>
      <Home getPosition={getPosition} />
      <Forecast />
    </Container>
  );
}

export default App;

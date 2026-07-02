import { useEffect, useRef, useState } from "react";
import Container from "./ui/Container.jsx";
import Forecast from "./features/forecast/Forecast.jsx";
import Home from "./features/home/Home.jsx";
import useCurrentWeather from "./hooks/useCurrentWeather.js";
import useForecast from "./hooks/useForecast.js";
import useGeolocation from "./hooks/useGeolocation.js";

function App() {
  // 获取位置信息
  const { getPosition } = useGeolocation();
  const {
    triggerGetWeather,
    data: weatherData,
    isMutating: isWeatherLoading,
  } = useCurrentWeather();
  const {
    triggerGetForecast,
    data: forecastData,
    isMutating: isForecastLoading,
  } = useForecast();
  const [loadError, setLoadError] = useState("");
  const hasAutoLoadedRef = useRef(false);

  async function triggerLoadWeather() {
    try {
      setLoadError("");
      const position = await getPosition();

      await Promise.all([
        triggerGetWeather(position),
        triggerGetForecast(position),
      ]);
    } catch (error) {
      setLoadError("暂时无法获取当前位置天气，请检查定位权限后重试");
      console.error("获取天气数据失败", error);
    }
  }

  useEffect(() => {
    if (hasAutoLoadedRef.current) {
      return;
    }

    hasAutoLoadedRef.current = true;
    void triggerLoadWeather();
  }, []);

  return (
    <Container>
      <Home
        weatherData={weatherData}
        triggerLoadWeather={triggerLoadWeather}
        isLoading={isWeatherLoading || isForecastLoading}
        loadError={loadError}
      />
      <Forecast forecastData={forecastData} />
    </Container>
  );
}

export default App;

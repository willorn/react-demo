import Container from "./components/Container";
import Forecast from "./components/Forecast";
import Home from "./components/Home";
import useCurrentWeather from "./hooks/useCurrentWeather.js";
import useForecast from "./hooks/useForecast.js";
import useGeolocation from "./hooks/useGeolocation.js";

function App() {
  // 获取位置信息
  const { currentLocation, getPosition } = useGeolocation();
  const {
    triggerGetWeather,
    data: weatherData,
    isMutating: isWeatherLoading,
  } = useCurrentWeather(getPosition);
  const {
    triggerGetForecast,
    data: forecastData,
    isMutating: isForecastLoading,
  } = useForecast(getPosition);

  async function triggerLoadWeather() {
    await Promise.all([triggerGetWeather(), triggerGetForecast()]);
  }

  return (
    <Container>
      <Home
        currentLocation={currentLocation}
        weatherData={weatherData}
        triggerLoadWeather={triggerLoadWeather}
        isLoading={isWeatherLoading || isForecastLoading}
      />
      <Forecast forecastData={forecastData} />
    </Container>
  );
}

export default App;

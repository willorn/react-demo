import { Button } from "@mui/material";
import Day from "./Day";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getCurWeatherApi } from "../services/getCurWeatherApi.js";

function Home({ getPosition }) {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState(null);

  const getWeather = async () => {
    const { latitude, longitude } = await getPosition();
    console.log("当前位置:", latitude + "," + longitude);

    const weatherData = await getCurWeatherApi(latitude, longitude);
    console.log("现在天气", weatherData);
    setWeatherData(weatherData);
  };

  return (
    <section className={styles.section}>
      位置: {weatherData?.name}
      <Day
        max={weatherData?.main.temp_max}
        min={weatherData?.main.temp_min}
        code={weatherData?.weather[0].icon}
      />
      <Button variant="contained" size="medium" onClick={getWeather}>
        Get Start
      </Button>
    </section>
  );
}

export default Home;

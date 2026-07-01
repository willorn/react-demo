import { Button } from "@mui/material";
import Day from "./Day";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function Home({ position }) {
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    if (!position) {
      return;
    }

    const { latitude, longitude } = position;
    const weatherURL = `${VITE_API_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${VITE_API_KEY}&unit=metric`;
    const weatherData = await fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("现在天气" + weatherData);
    setWeatherData(weatherData);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <section className={styles.section}>
      位置: {weatherData?.name}
      <Day position={position} />
      <Button variant="contained" size="medium" onClick={getWeather}>
        Get Start
      </Button>
    </section>
  );
}
export default Home;

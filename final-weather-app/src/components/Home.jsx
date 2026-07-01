import { Button } from "@mui/material";
import Day from "./Day";
import styles from "./Home.module.css";
import useCurrentWeather from "../hooks/useCurrentWeather.js";

function Home({ currentLocation, getPosition }) {
  const {
    triggerGetWeather,
    data: weatherData,
    isMutating,
    error,
  } = useCurrentWeather(getPosition);

  return (
    <section className={styles.section}>
      位置: {weatherData?.name}
      <Day
        max={weatherData?.main.temp_max}
        min={weatherData?.main.temp_min}
        code={weatherData?.weather?.[0]?.icon}
      />
      <Button
        disabled={isMutating}
        variant="contained"
        size="medium"
        onClick={triggerGetWeather}
      >
        Get Start
      </Button>
    </section>
  );
}

export default Home;

import { Button } from "@mui/material";
import Day from "./Day";
import styles from "./Home.module.css";

function Home({ weatherData, triggerLoadWeather, isLoading }) {
  return (
    <section className={styles.section}>
      位置: {weatherData?.name}
      <Day
        max={weatherData?.main.temp_max}
        min={weatherData?.main.temp_min}
        code={weatherData?.weather?.[0]?.icon}
      />
      <Button
        disabled={isLoading}
        variant="contained"
        size="medium"
        onClick={triggerLoadWeather}
      >
        Get Start
      </Button>
    </section>
  );
}

export default Home;

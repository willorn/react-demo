import styles from "./Day.module.css";

const VITE_ICON_API_URL = import.meta.env.VITE_ICON_API_URL;

function Day({
  date = "2024-04-03",
  current = 0,
  max = 100,
  min = 0,
  code = "10n",
  weather = "Weather",
}) {
  const isToday = date === new Date().toISOString().split("T")[0];
  const weatherIconUrl = `${VITE_ICON_API_URL}/${code}@2x.png`;

  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  return (
    <div className={styles.dayCard}>
      <p className={styles.label}>{isToday ? "Today" : formatDay(date)}</p>
      <img className={styles.icon} src={weatherIconUrl} alt={weather} />
      <p className={styles.currentTemp}>{Math.round(current)}&deg;</p>
      <p className={styles.summary}>{weather}</p>
      <p className={styles.range}>
        {Math.floor(min)}&deg; / {Math.ceil(max)}&deg;
      </p>
    </div>
  );
}
export default Day;

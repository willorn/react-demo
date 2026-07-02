import styles from "./Forecast.module.css";

const VITE_ICON_API_URL = import.meta.env.VITE_ICON_API_URL;

function formatDayLabel(dateText) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(new Date(dateText));
}

function formatTimeLabel(dateText) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateText));
}

function groupForecastByDay(forecastList) {
  return forecastList.reduce((groups, forecast) => {
    const dayKey = forecast.dt_txt.split(" ")[0];

    if (!groups[dayKey]) {
      groups[dayKey] = [];
    }

    groups[dayKey].push({
      id: forecast.dt,
      weatherIcon: `${VITE_ICON_API_URL}/${forecast.weather?.[0]?.icon}@2x.png`,
      weather: forecast.weather?.[0]?.main,
      description: forecast.weather?.[0]?.description,
      currentTemp: forecast.main?.temp,
      min: forecast.main?.temp_min,
      max: forecast.main?.temp_max,
      date: forecast.dt_txt,
    });

    return groups;
  }, {});
}

function Forecast({ forecastData }) {
  const forecastList = forecastData?.list ?? [];
  const groupedForecast = groupForecastByDay(forecastList);
  const forecastDays = Object.entries(groupedForecast);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>未来 5 天预报</h2>
      </header>

      {forecastDays.length === 0 ? (
        <div className={styles.emptyState}>
          暂无预报数据。
        </div>
      ) : (
        <div className={styles.days}>
          {forecastDays.map(([dayKey, dayForecasts]) => (
            <section key={dayKey} className={styles.dayGroup}>
              <div className={styles.dayHeader}>
                <h3 className={styles.dayTitle}>
                  {formatDayLabel(dayForecasts[0].date)}
                </h3>
                <span className={styles.dayMeta}>
                  共 {dayForecasts.length} 个时间点
                </span>
              </div>

              <div className={styles.slotGrid}>
                {dayForecasts.map((forecast) => (
                  <article key={forecast.id} className={styles.slotCard}>
                    <div className={styles.slotTime}>
                      {formatTimeLabel(forecast.date)}
                    </div>
                    <img
                      className={styles.slotIcon}
                      src={forecast.weatherIcon}
                      alt={forecast.description ?? forecast.weather ?? "weather"}
                    />
                    <div className={styles.slotWeather}>{forecast.weather}</div>
                    <div className={styles.slotTemp}>
                      {Math.round(forecast.currentTemp)}&deg;
                    </div>
                    <div className={styles.slotRange}>
                      {Math.floor(forecast.min)}&deg; /{" "}
                      {Math.ceil(forecast.max)}&deg;
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
export default Forecast;

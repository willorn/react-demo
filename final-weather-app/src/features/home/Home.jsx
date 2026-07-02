import { Button } from "@mui/material";
import Day from "../forecast/Day.jsx";
import styles from "./Home.module.css";

function Home({ weatherData, triggerLoadWeather, isLoading, loadError }) {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <h1 className={styles.title}>当前天气</h1>

            <div className={styles.locationRow}>
              <span className={styles.locationChip}>
                位置: {weatherData?.name ?? "正在定位..."}
              </span>
              {isLoading ? (
                <span className={styles.statusChip}>正在获取天气数据...</span>
              ) : null}
              {loadError ? (
                <span className={styles.errorChip}>{loadError}</span>
              ) : null}
            </div>

            <div className={styles.actionRow}>
              <Button
                className={styles.actionButton}
                disabled={isLoading}
                variant="contained"
                size="medium"
                onClick={triggerLoadWeather}
              >
                {weatherData ? "刷新天气" : "重新获取"}
              </Button>
            </div>
          </div>

          <div className={styles.panel}>
            {weatherData ? (
              <Day
                date={new Date().toISOString().split("T")[0]}
                current={weatherData?.main?.temp}
                max={weatherData?.main?.temp_max}
                min={weatherData?.main?.temp_min}
                code={weatherData?.weather?.[0]?.icon}
                weather={weatherData?.weather?.[0]?.main}
              />
            ) : isLoading ? (
              <div className={styles.loadingCard}>
                <div className={styles.skeletonPill} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonIcon} />
                <div className={styles.skeletonTemp} />
                <div className={styles.skeletonLine} />
              </div>
            ) : (
              <div className={styles.placeholderCard}>
                <p className={styles.placeholderTitle}>等待天气数据</p>
                <p className={styles.placeholderText}>
                  如果浏览器没有自动获取成功，可以点击上方按钮再次尝试。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

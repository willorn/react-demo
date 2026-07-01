// Current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_ICON_API_URL = import.meta.env.VITE_ICON_API_URL;

function Day({
  position,
  date = "2024-04-03",
  max = 100,
  min = 0,
  code = "10n",
}) {
  const isToday = date === new Date().toISOString().split("T")[0];
  const weatherIconUrl = `${VITE_ICON_API_URL}/${code}@2x.png`;

  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  return (
    <li className="day">
      <img src={weatherIconUrl} />
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}
        &deg;
      </p>
    </li>
  );
}
export default Day;

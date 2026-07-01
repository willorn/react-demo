import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";

// Weather forecast
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const VITE_ICON_API_URL = import.meta.env.VITE_ICON_API_URL;

function Forecast({ forecastData }) {
  const weatherForecasts =
    forecastData?.list?.slice(0, 4).map((forecast) => ({
      id: forecast.dt,
      weatherIcon: `${VITE_ICON_API_URL}/${forecast.weather?.[0]?.icon}@2x.png`,
      min: forecast.main?.temp_min,
      max: forecast.main?.temp_max,
      weather: forecast.weather?.[0]?.main,
      date: forecast.dt_txt,
    })) ?? [];

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {weatherForecasts.map((weatherForecast) => (
        <ListItem key={weatherForecast.id}>
          <ListItemAvatar>
            <Avatar>
              <img width={48} src={weatherForecast.weatherIcon} alt="" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={weatherForecast.weather}
            secondary={weatherForecast.date}
          />
          <span>
            {Math.floor(weatherForecast.min)}&deg;/
            {Math.ceil(weatherForecast.max)}
            &deg;
          </span>
        </ListItem>
      ))}
    </List>
  );
}
export default Forecast;

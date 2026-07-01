const WEATHER_API_KEY = import.meta.env.VITE_API_KEY;
const WEATHER_API_URL = import.meta.env.VITE_API_URL;

export async function getCurWeatherApi(lat, lon) {
  const response = await fetch(
    `${WEATHER_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
  );
  return await response.json();
}

import useSWRMutation from "swr/mutation";
import openWeatherApiFetcher from "../utils/openWeatherApiFetcher.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function useForecast() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "weather-forecast",
    openWeatherApiFetcher,
  );

  async function triggerGetForecast({ latitude, longitude }) {
    if (latitude == null || longitude == null) {
      console.log("位置信息为空");
      return;
    }

    await trigger({
      baseUrl: VITE_API_URL,
      path: "forecast",
      latitude,
      longitude,
      apiKey: VITE_API_KEY,
    });
  }

  return {
    triggerGetForecast,
    data,
    isMutating,
    error,
  };
}

export default useForecast;

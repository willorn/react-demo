import useSWRMutation from "swr/mutation";
import openWeatherApiFetcher from "../utils/openWeatherApiFetcher.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function useCurrentWeather() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    "current-weather",
    openWeatherApiFetcher,
  );

  async function triggerGetWeather({ latitude, longitude }) {
    if (latitude == null || longitude == null) {
      console.log("位置信息为空");

      return;
    }

    await trigger({
      baseUrl: VITE_API_URL,
      path: "weather",
      latitude,
      longitude,
      apiKey: VITE_API_KEY,
    });
  }

  return {
    triggerGetWeather,
    data,
    isMutating,
    error,
  };
}

export default useCurrentWeather;

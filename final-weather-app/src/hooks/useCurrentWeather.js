import useSWRMutation from "swr/mutation";
import fetcher from "../utils/fetcher.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function useCurrentWeather(getPosition) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    VITE_API_URL,
    fetcher,
  );

  async function triggerGetWeather() {
    const { latitude, longitude } = await getPosition();
    console.log("坐标位置" + latitude, longitude);

    if (!latitude || !longitude) {
      console.log("位置信息为空");

      return;
    }

    await trigger({
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

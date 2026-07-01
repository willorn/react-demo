import useSWRMutation from "swr/mutation";
import fetcher from "../utils/fetcher.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function useForecast(getPosition) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    VITE_API_URL,
    fetcher,
  );

  async function triggerGetForecast() {
    const { latitude, longitude } = await getPosition();

    if (latitude == null || longitude == null) {
      console.log("位置信息为空");
      return;
    }

    await trigger({
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

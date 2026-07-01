// SWR mutation fetcher:
// 1. 第一个参数 `key` 只是本次 mutation 的业务标识
// 2. 真正的请求信息从 trigger(arg) 传入的 arg 中读取
export default async function (_key, { arg }) {
  const { baseUrl, path, latitude, longitude, apiKey } = arg;

  // 根据不同的 path 复用同一套请求逻辑，比如 weather / forecast。
  const response = await fetch(
    `${baseUrl}/${path}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
  );

  // OpenWeather 返回的是 JSON，这里直接反序列化后交给调用方。
  return await response.json();
}

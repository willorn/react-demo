export default async function (url, { arg }) {
  const { path, latitude, longitude, apiKey } = arg;

  const response = await fetch(
    `${url}/${path}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
  );

  return await response.json();
}

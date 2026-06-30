import useSWR from "swr";

function App() {
  const adviceURL = "https://api.adviceslip.com/advice";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data,
    isLoading,
    isValidating,
    mutate: getAdvice,
  } = useSWR(adviceURL, fetcher);

  // isLoading 只表示首次加载：此时还没有数据可展示。
  // isValidating 表示正在请求：既包括首次加载，也包括后续点击按钮重新拉取数据。
  const adviceText = isValidating ? "Loading..." : data?.slip?.advice;

  return (
    <main>
      <h1>Advice App</h1>
      <p>{adviceText}</p>
      <p>isLoading: {isLoading ? "true" : "false"}</p>
      <p>isValidating: {isValidating ? "true" : "false"}</p>
      <button disabled={isLoading || isValidating} onClick={getAdvice}>
        Get Advice
      </button>
    </main>
  );
}

export default App;

import useSWR from "swr";
import useCurrentTime from "./useCurrentTime";

function App() {
  const adviceURL = "https://api.adviceslip.com/advice";
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const currentTime = useCurrentTime();

  const { data, isValidating, mutate: getAdvice } = useSWR(adviceURL, fetcher);
  // const [curTime, setCurTime] = useState(new Date().toLocaleString());
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurTime(new Date().toLocaleString());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <main>
      <h1>Advice App</h1>
      <p>Current Time: {currentTime}</p>
      <p>{isValidating ? "Loading..." : data.slip?.advice}</p>
      <button disabled={isValidating} onClick={getAdvice}>
        Get Advice
      </button>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";

// 自定义 Hook：返回当前时间，并且每秒自动更新一次。
function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    // 启动的时候启动定时器，每秒更新一次时间
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // 组件卸载时清理定时器，避免内存泄漏。
    return () => clearInterval(timer);
  }, []);

  return currentTime;
}

export default useCurrentTime;

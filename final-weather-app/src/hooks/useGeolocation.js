import { useEffect } from "react";
import { useState } from "react";

// 自定义 Hook：获取当前设备的地理位置。
function useGeolocation() {
  // 保存当前定位结果，初始值为 null，表示还没有拿到位置。
  const [currentLocation, setCurrentLocation] = useState(null);

  async function getPosition() {
    return new Promise((resolve, reject) => {
      const geolocation = navigator.geolocation;

      // 如果浏览器不支持定位能力，直接提示并结束。
      if (!geolocation) {
        reject("Geolocation is not supported by your browser");
        return;
      }

      // 解析浏览器返回的坐标对象，提取经纬度。
      // 并更新状态，供外部组件使用。
      geolocation.getCurrentPosition(
        (geolocationResult) => {
          const { latitude, longitude } = geolocationResult.coords;
          setCurrentLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  // 组件首次挂载时自动获取一次位置。
  useEffect(() => {
    getPosition();
  }, []);

  // 把当前位置返回给使用这个 Hook 的组件。
  return { currentLocation, getPosition };
}

export default useGeolocation;

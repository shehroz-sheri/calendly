import { useState, useEffect } from "react";
import { formatTime } from "../../../utils/formatTime";

export const useCurrentTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(formatTime(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
};

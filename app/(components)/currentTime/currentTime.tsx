"use client";

import { useCurrentTime } from "./useCurrentTime";

const CurrentTime: React.FC = () => {
  const time = useCurrentTime();

  return <>({time})</>;
};

export default CurrentTime;

export const parseTime = (timeStr: string): Date => {
  const [hourStr, minuteStr] = timeStr?.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr?.slice(0, 2));

  if (timeStr?.toLowerCase().includes("pm") && hour !== 12) {
    hour += 12;
  } else if (timeStr?.toLowerCase().includes("am") && hour === 12) {
    hour = 0;
  }

  const baseDate = new Date("2000-01-01");

  return new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    hour,
    minute
  );
};

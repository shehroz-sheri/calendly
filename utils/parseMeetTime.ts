export const parseDateTime = (
  dateStr: string,
  timeStr: string,
  timeZone: string
): string => {
  const date = new Date(dateStr);
  let [hours, minutes] =
    timeStr
      .match(/(\d+):(\d+)/)
      ?.slice(1)
      .map(Number) ?? [];
  const ampm = timeStr.match(/am|pm/i)?.[0].toLowerCase();

  if (ampm === "pm" && hours < 12) {
    hours += 12;
  }
  if (ampm === "am" && hours === 12) {
    hours = 0;
  }

  date.setHours(hours, minutes);

  return new Date(date.toLocaleString("en-US", { timeZone })).toISOString();
};

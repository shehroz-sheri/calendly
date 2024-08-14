export const convertTo12HourFormat = (hours: string): string => {
  const hour = parseInt(hours);
  if (hour === 0) {
    return `12:00am`;
  } else if (hour < 12) {
    return `${hour}:00am`;
  } else if (hour === 12) {
    return `12:00pm`;
  } else {
    return `${hour - 12}:00pm`;
  }
};

export const getCurrentTime = () => {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const am_pm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${am_pm}`;
};

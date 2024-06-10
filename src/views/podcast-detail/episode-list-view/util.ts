export const millsToMinuteFormat = (mills?: number) => {
  if (!mills) return "00:00";

  let seconds: number | undefined = mills / 1000;
  let minutes: number | undefined;
  let hours: number | undefined;

  if (seconds > 60) {
    minutes = Math.trunc(seconds / 60);
    seconds = seconds % 60;
    if (minutes > 60) {
      hours = Math.trunc(minutes / 60);
      minutes = minutes % 60;
      return `${toDecimal(hours)}:${toDecimal(minutes)}:${toDecimal(seconds)}`;
    }
    return `${toDecimal(minutes)}:${toDecimal(seconds)}`;
  } else {
    return `0:${toDecimal(Math.trunc(seconds))}`;
  }
  function toDecimal(time: number): string {
    if (time < 10) {
      return "0" + time;
    }
    return time.toString();
  }
};

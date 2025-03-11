export function formatTime(seconds) {
  const minutesStr = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsStr = String(seconds % 60).padStart(2, "0");
  return `${minutesStr}:${secondsStr}`;
}

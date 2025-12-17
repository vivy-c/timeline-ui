export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCountdown(msRemaining: number): string {
  const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const two = (n: number) => String(n).padStart(2, "0");
  return `${two(hours)}:${two(minutes)}:${two(seconds)}`;
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}


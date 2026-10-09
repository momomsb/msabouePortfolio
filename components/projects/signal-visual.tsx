import { cn } from "@/lib/utils";

/**
 * Decorative "signal" artwork for projects without screenshots: an abstract
 * waveform with two smoothed trend lines. Deterministic, carries no data.
 */

const POINTS = 64;

function series(seed: number) {
  return Array.from({ length: POINTS }, (_, i) => {
    const x = i / (POINTS - 1);
    return 0.5 + 0.18 * Math.sin(x * 9 + seed) + 0.09 * Math.sin(x * 23 + seed * 2) + 0.05 * Math.sin(x * 47) - 0.12 * x;
  });
}

function smooth(values: number[], window: number) {
  return values.map((_, i) => {
    const slice = values.slice(Math.max(0, i - window), i + 1);
    return slice.reduce((sum, v) => sum + v, 0) / slice.length;
  });
}

function toPath(values: number[], width: number, height: number) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (values.length - 1)) * width).toFixed(1)},${(v * height).toFixed(1)}`)
    .join(" ");
}

export function SignalVisual({ seed = 1, className }: { seed?: number; className?: string }) {
  const width = 400;
  const height = 200;
  const raw = series(seed);
  const fast = smooth(raw, 4);
  const slow = smooth(raw, 12);
  const area = `${toPath(raw, width, height)} L${width},${height} L0,${height} Z`;
  const gradientId = `signal-fill-${seed}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden className={cn("block", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((y) => (
        <line
          key={y}
          x1="0"
          x2={width}
          y1={y * height}
          y2={y * height}
          stroke="var(--color-line-strong)"
          strokeDasharray="2 6"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={toPath(raw, width, height)} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={toPath(fast, width, height)}
        fill="none"
        stroke="var(--color-fg)"
        strokeOpacity="0.5"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={toPath(slow, width, height)}
        fill="none"
        stroke="var(--color-violet)"
        strokeOpacity="0.8"
        strokeWidth="1"
        strokeDasharray="4 3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

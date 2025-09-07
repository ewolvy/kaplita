interface ProgressRingProps {
  progress: number; // 0-8
  total: number; // 8
  size?: number;
}

export default function ProgressRing({ progress, total, size = 64 }: ProgressRingProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / total) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        className="transform -rotate-90"
        viewBox="0 0 64 64"
        style={{ width: size, height: size }}
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="hsl(220, 13%, 91%)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="4"
          fill="none"
          className="progress-ring"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-slate-700">
          {progress}/{total}
        </span>
      </div>
    </div>
  );
}

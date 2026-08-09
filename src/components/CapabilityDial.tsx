type Props = {
  score: number;
  label: string;
};

const SIZE = 180;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CapabilityDial({ score, label }: Props) {
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="dial-wrap" role="img" aria-label={`Device readiness score ${score} out of 100, ${label}`}>
      <svg width={SIZE} height={SIZE}>
        <circle
          className="dial-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
        />
        <circle
          className="dial-value"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="dial-center">
        <span className="dial-score">{score}</span>
        <span className="dial-label">{label}</span>
      </div>
    </div>
  );
}

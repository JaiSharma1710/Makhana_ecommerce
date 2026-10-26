import type { CSSProperties } from "react";
import { rewardCenterAngle, wheelRewards } from "@/lib/wheel-rewards";

type RewardWheelProps = {
  rotation: number;
  spinning: boolean;
  onSpinEnd?: () => void;
};

const wheelBackground = (() => {
  let start = 0;
  const stops = wheelRewards.map((reward) => {
    const end = start + reward.weight;
    const stop = `${reward.color} ${start}% ${end}%`;
    start = end;
    return stop;
  });
  return `conic-gradient(${stops.join(", ")})`;
})();

export function RewardWheel({ rotation, spinning, onSpinEnd }: RewardWheelProps) {
  return (
    <div className="reward-wheel-wrap">
      <div className="reward-wheel-pointer" aria-hidden="true" />
      <div
        className={`reward-wheel${spinning ? " is-spinning" : ""}`}
        style={{
          "--wheel-rotation": `${rotation}deg`,
          background: wheelBackground
        } as CSSProperties}
        role="img"
        aria-label="Launch reward wheel with weighted reward segments"
        onTransitionEnd={(event) => {
          if (spinning && event.target === event.currentTarget && event.propertyName === "transform") {
            onSpinEnd?.();
          }
        }}
      >
        {wheelRewards.map((reward) => (
          <span
            className="reward-wheel-label"
            key={reward.id}
            style={{ "--label-angle": `${rewardCenterAngle(reward.id)}deg` } as CSSProperties}
          >
            {reward.shortLabel}
          </span>
        ))}
        <div className="reward-wheel-hub" aria-hidden="true">KB</div>
      </div>
    </div>
  );
}

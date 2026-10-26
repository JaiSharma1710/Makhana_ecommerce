export const wheelRewards = [
  {
    id: "10_percent_first_order",
    label: "10% off first order",
    shortLabel: "10% off",
    resultHeading: "You unlocked 10% off your first order 🎉",
    resultText: "Your reward is saved to this email. We’ll send your personal launch code when Khao Better opens for orders.",
    weight: 35,
    color: "#F26A2E"
  },
  {
    id: "15_percent_first_order",
    label: "15% off first order",
    shortLabel: "15% off",
    resultHeading: "You unlocked 15% off your first order 🎉",
    resultText: "Your reward is saved to this email. We’ll send your personal launch code when Khao Better opens for orders.",
    weight: 20,
    color: "#FFC928"
  },
  {
    id: "free_shipping_first_order",
    label: "Free shipping on first order",
    shortLabel: "Free shipping",
    resultHeading: "You unlocked free shipping on your first order 🎉",
    resultText: "Your reward is saved to this email. We’ll send the redemption details when orders open.",
    weight: 20,
    color: "#FFB36B"
  },
  {
    id: "early_access_first_batch",
    label: "Early access to first batch",
    shortLabel: "Early access",
    resultHeading: "You unlocked early access to our first batch 👀",
    resultText: "We’ll email you before general launch access opens.",
    weight: 15,
    color: "#FFDCC7"
  },
  {
    id: "priority_launch_access",
    label: "Priority launch access",
    shortLabel: "Priority access",
    resultHeading: "You unlocked priority launch access 🎉",
    resultText: "We’ll email you when your priority access is ready.",
    weight: 10,
    color: "#FFF4E5"
  }
] as const;

export type WheelReward = (typeof wheelRewards)[number];
export type WheelRewardId = WheelReward["id"];

export const wheelRewardIndex = Object.fromEntries(
  wheelRewards.map((reward) => [reward.id, reward])
) as Record<WheelRewardId, WheelReward>;

export function selectWeightedReward(randomValue = secureRandom()) {
  const point = Math.min(0.999999999, Math.max(0, randomValue)) * 100;
  let cumulativeWeight = 0;

  for (const reward of wheelRewards) {
    cumulativeWeight += reward.weight;
    if (point < cumulativeWeight) return reward;
  }

  return wheelRewards[wheelRewards.length - 1];
}

export function rewardCenterAngle(rewardId: WheelRewardId) {
  let start = 0;
  for (const reward of wheelRewards) {
    const end = start + reward.weight * 3.6;
    if (reward.id === rewardId) return start + (end - start) / 2;
    start = end;
  }
  return 0;
}

function secureRandom() {
  if (typeof crypto === "undefined") return Math.random();
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] / 2 ** 32;
}

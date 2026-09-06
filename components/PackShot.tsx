import { images } from "@/data/store";

export function PackShot({ id, small, className = "" }: { id: string; small?: boolean; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${id} makhana pack`}
      className={`pack-shot ${small ? "pack-shot-sm" : ""} ${className}`}
      style={{ backgroundImage: `url(${images[id]})` }}
    />
  );
}

import Image from "next/image";
import { images } from "@/data/store";

const imageDimensions: Record<string, { width: number; height: number }> = {
  classic: { width: 1145, height: 1374 },
  peri: { width: 1145, height: 1374 },
  pudina: { width: 1144, height: 1375 },
  achari: { width: 1145, height: 1374 },
  tomato: { width: 1145, height: 1374 },
  cheese: { width: 1144, height: 1375 }
};

export function PackShot({ id, small, className = "", sizes }: { id: string; small?: boolean; className?: string; sizes?: string }) {
  const dimensions = imageDimensions[id] ?? imageDimensions.classic;

  return (
    <div
      className={`pack-shot ${small ? "pack-shot-sm" : ""} ${className}`}
    >
      <Image
        src={images[id]}
        alt={`${id} makhana pack`}
        width={dimensions.width}
        height={dimensions.height}
        sizes={sizes ?? (small ? "118px" : "(max-width: 760px) 46vw, (max-width: 1180px) 30vw, 360px")}
      />
    </div>
  );
}

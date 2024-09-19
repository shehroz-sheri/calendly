import Image from "next/image";
import { topCornerImg } from "@/public/assets";

export default function TopCornerImage() {
  return (
    <div>
      <Image
        src={topCornerImg}
        alt="topCornerImage"
        className="w-[80px] h-[80px] sm:w-[105px] sm:h-[105px] absolute top-0 right-0"
        width={105}
        height={105}
      />
    </div>
  );
}

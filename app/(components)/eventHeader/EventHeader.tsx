import { linkIcon } from "@/public/assets";
import Image from "next/image";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { EventHeaderProps } from "@/types/types";
import { useEventHeader } from "./useEventHeader";

const EventHeader: React.FC<EventHeaderProps> = ({ eventLink }) => {
  const { handleCopyLink } = useEventHeader();

  return (
    <div className="h-14 shadow-md flex items-center">
      <div className="w-full max-lg:px-2 lg:w-[55.5%] flex justify-end h-[44px] mx-auto text-[13.13px]">
        <DropdownMenu />
        {eventLink && (
          <button
            onClick={() => handleCopyLink(eventLink)}
            className="rounded-[40px] border w-[116.8px] h-[44px] border-dark flex justify-center items-center gap-2 cursor-pointer"
          >
            <Image
              src={linkIcon}
              width={16}
              height={16}
              alt="link icon"
              className="inline"
            />
            Copy Link
          </button>
        )}
      </div>
    </div>
  );
};

export default EventHeader;

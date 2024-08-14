import { times } from "@/constants/Constants";
import { TimeDropdownProps } from "@/types/types";
import { FaChevronDown } from "react-icons/fa";


const TimeDropdown: React.FC<TimeDropdownProps> = ({ id, onChange, filteredTimes }) => {
    const options = filteredTimes || times;

    return (
        <div className="relative inline-block w-full">
            <select
                id={id}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
            >
                {options?.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pe-3 text-primary">
                <FaChevronDown size={10} color="primary" className="fill-current text-primary" />
            </div>
        </div>
    );
};

export default TimeDropdown;

import { TimeDropdownProps } from "@/types/types";
import { FaChevronDown } from "react-icons/fa";

const times = [
    '12:00 am', '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am',
    '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am',
    '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm',
    '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm',
];


const TimeDropdown: React.FC<TimeDropdownProps> = ({ id, onChange, filteredTimes }) => {
    const options = filteredTimes || times;

    return (
        <div className="relative inline-block w-full">
            <select
                id={id}
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChange}
            >
                {options.map((time, index) => (
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

import { AccDropdownProps } from "@/types/types";
import { FaChevronDown } from "react-icons/fa";

const AccDropdown: React.FC<AccDropdownProps> = ({
  id,
  options,
  value,
  onChange,
  label,
  info,
  className = "",
}) => {
  return (
    <div className="relative mt-1 w-full">
      <label htmlFor={id} className="font-bold text-sm">
        {label}
      </label>
      {info && (
        <span className="ml-2 max-w-min border-[1.5px] border-gray-500 text-[7.5px] text-gray-500 px-[3.5px] rounded-full cursor-pointer">
          i
        </span>
      )}
      <select id={id} value={value} onChange={onChange} className={className}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pe-3 text-primary">
        <FaChevronDown
          size={10}
          className={`fill-current text-primary ${
            id === "time-zone" ? "" : "mt-[25.5px]"
          }`}
        />
      </div>
    </div>
  );
};

export default AccDropdown;

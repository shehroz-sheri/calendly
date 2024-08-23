import { AccTextInputProps } from "@/types/types";

const AccTextInput: React.FC<AccTextInputProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  info,
}) => {
  return (
    <div className="mb-3 mt-4">
      <label htmlFor={id} className="font-bold text-sm">
        {label}
      </label>
      {info && (
        <span className="ml-2 max-w-min border-[1.5px] border-gray-500 text-[7.5px] text-gray-500 px-[3.5px] rounded-full cursor-pointer">
          i
        </span>
      )}
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 border border-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 w-full md:w-[530px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AccTextInput;

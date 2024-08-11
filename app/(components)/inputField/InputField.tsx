import { InputFieldProps } from "@/types/types";

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    type,
    value,
    placeholder,
    required = false,
    minLength,
    onChange,
}) => {
    return (
        <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
            <label className="text-[14.75px] font-bold leading-[22px]" htmlFor={id}>
                Enter your {name}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                required={required}
                minLength={minLength}
                onChange={onChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;

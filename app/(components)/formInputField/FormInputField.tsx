import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FormInputFieldProps } from "@/types/types";

const FormInputField: React.FC<FormInputFieldProps> = ({
  id,
  name,
  type,
  value,
  placeholder,
  required = false,
  minLength,
  maxLength,
  onChange,
  showPassword,
  togglePasswordVisibility,
  label,
  className,
}) => {
  const isPassword = type === "password";

  return (
    <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
      {label && (
        <label className="text-[14.75px] font-bold leading-[22px]" htmlFor={id}>
          {isPassword ? label : `Enter your ${label}`}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={isPassword && showPassword ? "text" : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          className={`${className} ${
            isPassword ? "pr-[2.5rem] pl-[15px]" : "pl-[15px]"
          }`}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInputField;

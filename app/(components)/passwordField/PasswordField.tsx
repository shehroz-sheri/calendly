import { PasswordFieldProps } from "@/types/types";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const PasswordField: React.FC<PasswordFieldProps> = ({
    id,
    name,
    label,
    value,
    showPassword,
    togglePasswordVisibility,
    onChange,
}) => {
    return (
        <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
            <label className="text-[14.75px] font-bold leading-[22px]" htmlFor={id}>
                {label}
            </label>
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    minLength={6}
                    maxLength={9}
                    className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10"
                    placeholder="Password"
                    style={{ paddingRight: "2.5rem" }}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
            </div>
        </div>
    );
};

export default PasswordField;

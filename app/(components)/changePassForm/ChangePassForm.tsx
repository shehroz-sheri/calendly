"use client";

import { useChangePassForm } from "./useChangePassForm";
import FormInputField from "../formInputField/FormInputField";
import { changePassInputFields } from "@/constants/Constants";

const ChangePassForm: React.FC = () => {
  const {
    formState,
    togglePasswordVisibility,
    loading,
    handlePasswordChange,
    handleChange,
  } = useChangePassForm();

  return (
    <>
      <form className="space-y-6" onSubmit={handlePasswordChange}>
        {changePassInputFields.map((field) => (
          <FormInputField
            key={field.name}
            id={field.id}
            name={field.name}
            type="password"
            label={field.label}
            value={formState[field.name as keyof typeof formState] as string}
            onChange={handleChange}
            showPassword={
              formState[
                `${field.name}Show` as keyof typeof formState
              ] as boolean
            }
            togglePasswordVisibility={() =>
              togglePasswordVisibility(
                field?.name === "currentPassword"
                  ? "currentPasswordShow"
                  : "newPasswordShow"
              )
            }
            required
            minLength={6}
            maxLength={9}
            className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10"
          />
        ))}

        <div>
          <button
            type="submit"
            className="w-full bg-primary flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassForm;

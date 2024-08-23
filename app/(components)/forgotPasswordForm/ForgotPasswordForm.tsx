"use client";

import Link from "next/link";
import { useForgotPassword } from "./useForgotPassword";
import FormInputField from "../formInputField/FormInputField";

const ForgotPasswordForm: React.FC = () => {
  const { email, loading, handleChange, handleForgotPassword } =
    useForgotPassword();

  return (
    <>
      <div className="border sm:w-[440px] rounded-lg pt-8 pb-3.5 my-4 shadow text-left mx-auto">
        <form onSubmit={handleForgotPassword}>
          <div className="px-3 sm:px-[33px]">
            <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
              <FormInputField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={email}
                placeholder="test@example.com"
                required
                onChange={handleChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-primary hover:bg-primary/80 w-[200px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-t-4 border-t-white border-dark/40 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-[12.91px]">
            Remember your password?{" "}
            <Link
              className="text-primary hover:text-primary/80"
              href={"/auth/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;

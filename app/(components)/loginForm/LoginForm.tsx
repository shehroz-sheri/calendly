"use client";

import Link from "next/link";
import GoogleLogin from "../googleLogin/GoogleLogin";
import { useLoginForm } from "./useLoginForm";
import FormInputField from "../formInputField/FormInputField";

const LoginForm: React.FC = () => {
  const {
    user,
    showPassword,
    showLoading,
    loginLoading,
    togglePasswordVisibility,
    handleChange,
    handleUserLogin,
  } = useLoginForm();

  return (
    <div>
      <div className="border sm:w-[440px] rounded-lg pt-7 pb-3.5 my-4 shadow text-left mx-auto">
        <form onSubmit={handleUserLogin}>
          <div className="px-3 sm:px-[33px]">
            <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
              <FormInputField
                id="email"
                name="email"
                type="email"
                value={user?.email}
                placeholder="test@example.com"
                required
                label="email"
                onChange={handleChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>
            <div className="sm:w-[374px] flex flex-col justify-evenly">
              <FormInputField
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Enter your password"
                value={user?.password}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                onChange={handleChange}
                className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
              <Link
                href={"/auth/forgot-password"}
                className="text-primary hover:text-primary/80 self-end mt-1 text-[12.91px]"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-primary hover:bg-primary/80 w-[92px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px]"
              type="submit"
            >
              {loginLoading || showLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-t-4 border-t-white border-dark/40 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-[12.91px]">
            Don't have an account?{" "}
            <Link
              className="text-primary hover:text-primary/80"
              href={"/auth/signup"}
            >
              Sign up
            </Link>
          </p>
        </div>

        <div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

'use client'

import InputField from "../inputField/InputField";
import PasswordField from "../passwordField/PasswordField";
import Link from "next/link";
import GoogleLogin from "../googleLogin/GoogleLogin";
import { useSignupForm } from "./useSignupForm";

const SignupForm: React.FC = () => {
    const {
        user,
        showPassword,
        usernameError,
        handleChange,
        handleUserRegister,
        togglePasswordVisibility,
        getPasswordStrength,
        signupLoading,
        error
    } = useSignupForm();

    return (
        <div>
            <div className="border sm:w-[440px] rounded-lg py-6 my-2 shadow text-left mx-auto">
                <form onSubmit={handleUserRegister}>
                    <div className="px-3 sm:px-[33px] sm:pt-[33px]">
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            placeholder="test@example.com"
                            required
                            onChange={handleChange}
                        />
                        <InputField
                            id="name"
                            name="name"
                            type="text"
                            value={user.name}
                            placeholder="Shehroz Arshad"
                            required
                            minLength={3}
                            onChange={handleChange}
                        />
                        <InputField
                            id="username"
                            name="username"
                            type="text"
                            value={user.username}
                            placeholder="shehroz.sheri1"
                            required
                            minLength={4}
                            onChange={handleChange}
                        />
                        {usernameError && (
                            <p className="text-danger text-[12px]">{usernameError}</p>
                        )}
                        <PasswordField
                            id="password"
                            name="password"
                            label="Choose a password with at least 8 characters"
                            value={user.password}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                            onChange={handleChange}
                        />
                        <div className="mt-1 h-[60px] flex flex-col justify-around">
                            <div className="h-1 bg-gray-200 rounded">
                                <div
                                    className="h-full bg-primary rounded"
                                    style={{ width: `${getPasswordStrength(user.password)}%` }}
                                ></div>
                            </div>
                            <div className="h-[42px] min-w-[297.28px] ml-5">
                                <p className="text-sm text-danger text-[12.91px] leading-[21px]">
                                    Use a few words, avoid common phrases
                                </p>
                                <p className="text-sm text-danger text-[12.91px] leading-[21px]">
                                    No need for symbols, digits or uppercase letters
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-[400px] h-[29px] mx-auto mt-6 max-sm:px-3 text-center">
                        <p className="text-[12px] leading-[18px]">
                            By creating a Calendly account, you agree to{" "}
                            <Link className="text-primary hover:text-blue-400" href={"#"}>
                                Calendly's Terms
                            </Link>{" "}
                            and{" "}
                            <Link className="text-primary hover:text-blue-400" href={"#"}>
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            className="bg-primary hover:bg-blue-500 w-[92px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px]"
                            type="submit"
                        >
                            {signupLoading
                                ? <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-4 border-t-4 border-t-white border-dark/40 rounded-full animate-spin"></div>
                                </div>
                                : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <p className="text-[12.91px]">
                        Already have an account?{" "}
                        <Link
                            className="text-primary hover:text-blue-400"
                            href={"/auth/login"}
                        >
                            Login Here
                        </Link>
                    </p>
                </div>

                <div>
                    <div className="flex items-center mt-4 text-sm">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="text-center mt-2">
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
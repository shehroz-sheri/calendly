'use client';

import PasswordField from "../passwordField/PasswordField";
import Link from "next/link";
import { useResetPassForm } from "./useResetPassForm";

const ResetPassForm: React.FC = () => {
    const {
        newPassword,
        confirmPassword,
        showPassword,
        loading,
        togglePasswordVisibility,
        handleChange,
        handleResetPassword,
    } = useResetPassForm();

    return (
        <>
            <div className="border sm:w-[440px] rounded-lg pt-8 pb-3.5 my-4 shadow text-left mx-auto">
                <form onSubmit={handleResetPassword}>
                    <div className="px-3 sm:px-[33px]">
                        <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
                            <PasswordField
                                id="newPassword"
                                name="newPassword"
                                label="Enter new password"
                                value={newPassword}
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="h-[76px] sm:w-[374px] flex flex-col justify-evenly">
                            <PasswordField
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm new password"
                                value={confirmPassword}
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            className={`bg-primary hover:bg-primary/80 w-[200px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-4 border-t-4 border-t-white border-dark/40 rounded-full animate-spin"></div>
                                </div>
                                : 'Reset Password'}
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
    )
}

export default ResetPassForm
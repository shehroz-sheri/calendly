'use client'

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "./useGoogleLogin";

const GoogleLogin: React.FC = () => {
    const { googleLoading, handleGoogleLoginClick } = useGoogleLogin();

    return (
        <button
            disabled={googleLoading}
            onClick={handleGoogleLoginClick}
            className={`flex items-center justify-center ${googleLoading ? 'text-dark/50' : 'text-dark'} hover:bg-gray-100 h-10 px-4 rounded-[40px] text-[14.5px] leading-[22px] mx-auto`}
        >
            {googleLoading ? (
                <svg
                    className="animate-spin h-5 w-5 text-primary mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                </svg>
            ) : (
                <FcGoogle className="mr-2" size={18} />
            )}
            Continue with Google
        </button>
    )
}

export default GoogleLogin
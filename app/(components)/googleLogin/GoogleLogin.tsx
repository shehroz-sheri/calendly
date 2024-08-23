"use client";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "./useGoogleLogin";
import { ImSpinner2 } from "react-icons/im";

const GoogleLogin: React.FC = () => {
  const { googleLoading, handleGoogleLoginClick } = useGoogleLogin();

  return (
    <button
      disabled={googleLoading}
      onClick={handleGoogleLoginClick}
      className={`flex items-center justify-center ${
        googleLoading ? "text-dark/50" : "text-dark"
      } hover:bg-gray-100 h-10 px-4 rounded-[40px] text-[14.5px] leading-[22px] mx-auto`}
    >
      {googleLoading ? (
        <ImSpinner2 className="animate-spin mr-2" size={18} />
      ) : (
        <FcGoogle className="mr-2" size={18} />
      )}
      Continue with Google
    </button>
  );
};

export default GoogleLogin;

"use client";

import Link from "next/link";
import { useAuthError } from "./useAuthError";

const AuthError: React.FC = () => {
  const { errorMessage } = useAuthError();
  return (
    <>
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Authentication Error
        </h1>
        <p className="text-red-600 text-center mb-6">{errorMessage}</p>
        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 hover:bg-primary/80"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthError;

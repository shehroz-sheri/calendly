import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const useAuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  }, [error]);

  return {
    errorMessage,
  };
};

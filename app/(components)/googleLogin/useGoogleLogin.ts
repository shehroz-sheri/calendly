import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectGoogleLoginLoading } from "@/redux/slices/googleLoginSlice";
import { handleGoogleLogin } from "@/utils/googleLogin";

export const useGoogleLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const googleLoading = useSelector(selectGoogleLoginLoading);

  const handleGoogleLoginClick = async () => {
    try {
      await handleGoogleLogin(dispatch);
    } catch (error) {}
  };

  return {
    googleLoading,
    handleGoogleLoginClick,
  };
};

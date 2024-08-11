import { googleLogin } from "@/redux/slices/googleLoginSlice";
import { AppDispatch } from "@/redux/store";

export const handleGoogleLogin = async (dispatch: AppDispatch) => {
  await dispatch(googleLogin()).unwrap();
};

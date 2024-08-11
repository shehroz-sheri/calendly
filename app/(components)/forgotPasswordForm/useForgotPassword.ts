import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  forgotPassword,
  selectForgotPasswordError,
  selectForgotPasswordLoading,
} from "@/redux/slices/forgotPasswordSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectForgotPasswordLoading);
  const error = useAppSelector(selectForgotPasswordError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(resultAction)) {
      Swal.fire({
        icon: "success",
        title: "Verification link sent!",
        text: "Please check your email for verification link.",
      });
    } else if (forgotPassword.rejected.match(resultAction)) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  };

  return {
    email,
    loading,
    handleChange,
    handleForgotPassword,
  };
};

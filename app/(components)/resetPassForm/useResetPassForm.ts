import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  resetPassword,
  selectResetPasswordError,
  selectResetPasswordLoading,
} from "@/redux/slices/resetPasswordSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export const useResetPassForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [formState, setFormState] = useState({
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectResetPasswordLoading);
  const error = useAppSelector(selectResetPasswordError);

  const togglePasswordVisibility = () => {
    setFormState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.newPassword !== formState.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const resultAction = await dispatch(
        resetPassword({ token, email, newPassword: formState.newPassword })
      );
      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successfully");
        router.push("/auth/login");
      } else if (resetPassword.rejected.match(resultAction)) {
        toast.error(error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return {
    formState,
    loading,
    togglePasswordVisibility,
    handleChange,
    handleResetPassword,
  };
};

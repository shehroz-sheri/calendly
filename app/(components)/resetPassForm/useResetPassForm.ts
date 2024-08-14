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

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectResetPasswordLoading);
  const error = useAppSelector(selectResetPasswordError);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const resultAction = await dispatch(
        resetPassword({ token, email, newPassword })
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
    newPassword,
    confirmPassword,
    showPassword,
    loading,
    togglePasswordVisibility,
    handleChange,
    handleResetPassword,
  };
};

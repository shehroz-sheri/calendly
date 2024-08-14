import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  changePassword,
  selectChangePasswordLoading,
} from "@/redux/slices/changePasswordSlice";
import toast from "react-hot-toast";

export const useChangePassForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectChangePasswordLoading);

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentPassword === newPassword) {
      return toast.error(
        "New password cannot be the same as current password!"
      );
    }

    try {
      const res = await dispatch(
        changePassword({ oldPassword: currentPassword, newPassword })
      ).unwrap();
      setCurrentPassword("");
      setNewPassword("");
      toast.success(res?.message || "Password updated successfully!");
    } catch (error) {
      toast.error((error as string) || "Something went wrong! Try again!");
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    loading,
    handlePasswordChange,
  };
};

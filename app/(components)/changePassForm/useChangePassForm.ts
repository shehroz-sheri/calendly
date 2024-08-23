import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  changePassword,
  selectChangePasswordLoading,
} from "@/redux/slices/changePasswordSlice";
import toast from "react-hot-toast";

export const useChangePassForm = () => {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    currentPasswordShow: false,
    newPasswordShow: false,
  });

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectChangePasswordLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (
    field: "currentPasswordShow" | "newPasswordShow"
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.currentPassword === formState.newPassword) {
      return toast.error(
        "New password cannot be the same as current password!"
      );
    }

    try {
      const res = await dispatch(
        changePassword({
          oldPassword: formState.currentPassword,
          newPassword: formState.newPassword,
        })
      ).unwrap();
      setFormState({
        currentPassword: "",
        newPassword: "",
        currentPasswordShow: false,
        newPasswordShow: false,
      });
      toast.success(res?.message || "Password updated successfully!");
    } catch (error) {
      toast.error((error as string) || "Something went wrong! Try again!");
    }
  };

  return {
    loading,
    handlePasswordChange,
    handleChange,
    formState,
    togglePasswordVisibility,
  };
};

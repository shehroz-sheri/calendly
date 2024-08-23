import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { getCurrentTime } from "../../../utils/profileTime";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  deleteUser,
  updateUser,
  selectDeleteUserLoading,
  selectUpdateUserLoading,
  selectUserError,
} from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { UserData } from "@/types/types";

export const useAccDetails = () => {
  const [time, setTime] = useState("");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const session = useSession();
  const dispatch = useAppDispatch();

  const updateUserLoading = useAppSelector(selectUpdateUserLoading);
  const deleteUserLoading = useAppSelector(selectDeleteUserLoading);
  const userError = useAppSelector(selectUserError);

  useEffect(() => {
    setTime(getCurrentTime());
  }, []);

  useEffect(() => {
    if (session?.data?.user?.name) {
      setUserData({
        name: session?.data?.user?.name,
        email: session?.data?.user?.email,
        image: session?.data?.user?.image,
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;

    try {
      await dispatch(updateUser({ data: name })).unwrap();
      return toast.success("Profile updated successfully!");
    } catch (err) {
      return toast.error(
        userError || "Something went wrong! Please try again."
      );
    }
  };

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C84545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteUser()).unwrap();
          await signOut({ callbackUrl: "/auth/login" });
          return toast.success("Account deleted successfully!");
        } catch (err) {
          return toast.error(
            userError || "Something went wrong! Please try again."
          );
        }
      }
    });
  };

  return {
    time,
    userData,
    setUserData,
    updateUserLoading,
    deleteUserLoading,
    userError,
    handleChange,
    dispatch,
    handleUpdateProfile,
    handleDeleteAccount,
  };
};

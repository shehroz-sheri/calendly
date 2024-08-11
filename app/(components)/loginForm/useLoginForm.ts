import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchAvailability } from "@/redux/slices/getAvailabilitySlice";
import { loginUser, userVerification } from "@/redux/slices/loginSlice";
import { LoginUser } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const isVerified = searchParams.get("verified");
  const error = searchParams.get("error");

  const {
    loading: loginLoading,
    error: loginError,
    loginSuccess,
  } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (error === "OAuthCallbackError") {
      toast.error("Authentication Error. You are not authorized to login");
    }
  }, [error]);

  useEffect(() => {
    if (isVerified === "true") {
      Swal.fire({
        icon: "success",
        title: "Email verified successfully!",
        text: "You can now login.",
      });
    }
  }, [isVerified]);

  const [user, setUser] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUserLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setShowLoading(true);
      const userVerificationResponse = await dispatch(
        userVerification(user)
      ).unwrap();

      if (userVerificationResponse.status === 203) {
        Swal.fire({
          title: "Verification email sent!",
          text: "Your email is not verified. Please check your inbox for verification.",
        });
        return;
      }

      let showAvailability = false;

      try {
        const availabilityResponse = await dispatch(
          fetchAvailability(user.email)
        ).unwrap();
        if (availabilityResponse.availability === null) {
          showAvailability = true;
        }
      } catch (error) {}

      const loginResponse = await dispatch(
        loginUser({ ...user, availability: showAvailability })
      ).unwrap();
      router.push(loginResponse);
      toast.success("Login Successful!");
    } catch (error: any) {
      if (error === "Password not found") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have logged in with Google with this account before! If you want to add password credentials, please use forgot password to set a new password.",
        });
        return;
      }
      toast.error(error || "Something went wrong. Please try again!");
    } finally {
      setShowLoading(false);
    }
  };

  return {
    user,
    showPassword,
    showLoading,
    loginLoading,
    togglePasswordVisibility,
    handleChange,
    handleUserLogin,
  };
};

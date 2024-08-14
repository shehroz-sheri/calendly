import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signupUser } from "@/redux/slices/signupSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { SignupUser } from "@/types/types";
import Swal from "sweetalert2";

export const useSignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { signupLoading, error } = useSelector(
    (state: RootState) => state.signup
  );

  const [user, setUser] = useState<SignupUser>({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === "username") {
      const usernamePattern = /^(?=.*\d)[a-zA-Z\d]+$/;
      if (!usernamePattern.test(value)) {
        setUsernameError("Username must include at least one digit.");
      } else {
        setUsernameError(null);
      }
    }
  };

  const handleUserRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameError) {
      return toast.error("Username must include at least one digit.");
    }

    dispatch(signupUser(user))
      .unwrap()
      .then((data) => {
        if (data?.status === 201) {
          toast.success(
            "Verification email sent successfully. Please check your inbox."
          );
          router.push("/auth/login");
        }
      })
      .catch((err) => {
        if (err == "Error sending email") {
          Swal.fire({
            icon: "warning",
            title: "User registered but error sending email",
            text: "User has been registered successfully but verification email could not be sent. Please try to login for your email verification later in 24 to 48 hours.",
          });
          return;
        }
        toast.error(err);
      });
  };

  const getPasswordStrength = (password: string) => {
    const lengthCriteria = password.length >= 8;
    const lowercaseCriteria = /[a-z]/.test(password);

    const criteriaMet = [lengthCriteria, lowercaseCriteria].filter(
      Boolean
    ).length;

    return (criteriaMet / 2) * 100;
  };

  return {
    user,
    showPassword,
    usernameError,
    handleChange,
    handleUserRegister,
    togglePasswordVisibility,
    getPasswordStrength,
    signupLoading,
    error,
  };
};

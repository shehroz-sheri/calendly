import Logo from "@/app/(components)/logo/Logo";
import LoginForm from "@/app/(components)/loginForm/LoginForm";
import { FaSpinner } from "react-icons/fa";
import { Suspense } from "react";

export const metadata = {
  title: "Login - Calendly",
  description:
    "Log in to your Calendly account to manage your appointments and schedule meetings with ease.",
  openGraph: {
    title: "Login - Calendly",
    description:
      "Log in to your Calendly account to manage your appointments and schedule meetings with ease.",
    url: "https://calendly-by-shehroz.vercel.app/auth/login",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Login to Calendly",
      },
    ],
  },
};

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="text-center w-[92%] sm:w-[440px] my-4">
        <Logo className="mx-auto" width={182} />
        <p className="font-bold max-w-[268.65px] mx-auto text-xl">
          Login with Calendly
        </p>
        <Suspense fallback={<FaSpinner className="text-5xl animate-spin" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Login;

import Logo from "@/app/(components)/logo/Logo";
import SignupForm from "@/app/(components)/signupForm/SignupForm";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

export const metadata = {
  title: 'Sign Up - Calendly',
  description: 'Create your free Calendly account to start scheduling meetings and managing appointments effortlessly.',
  openGraph: {
    title: 'Sign Up - Calendly',
    description: 'Create your free Calendly account to start scheduling meetings and managing appointments effortlessly.',
    url: 'https://calendly-by-shehroz.vercel.app/auth/signup',
    images: [
      {
        url: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png',
        width: 1200,
        height: 630,
        alt: 'Sign Up for Calendly',
      },
    ],
  },
};


const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="text-center w-[92%] sm:w-[440px] my-4">
        <Logo className="mx-auto" width={182} />
        <p className="font-bold max-w-[268.65px] mx-auto text-xl">
          Sign up with Calendly for free
        </p>
        <Suspense fallback={<div><FaSpinner className="text-5xl animate-spin" /></div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Signup;

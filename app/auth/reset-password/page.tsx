import Logo from "@/app/(components)/logo/Logo";
import ResetPassForm from "@/app/(components)/resetPassForm/ResetPassForm";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

export const metadata = {
    title: 'Reset Password - Calendly',
    description: 'Reset your Calendly account password to regain access to your appointments and meetings.',
    openGraph: {
        title: 'Reset Password - Calendly',
        description: 'Reset your Calendly account password to regain access to your appointments and meetings.',
        url: 'https://calendly-by-shehroz.vercel.app/auth/reset-password',
        images: [
            {
                url: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png',
                width: 1200,
                height: 630,
                alt: 'Reset Password - Calendly',
            },
        ],
    },
};


const ResetPassword: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center flex-col">
            <div className="text-center w-[92%] sm:w-[440px] my-4">
                <Logo className="mx-auto" width={182} />
                <p className="font-bold max-w-[268.65px] mx-auto text-xl">
                    Reset Password
                </p>
                <Suspense fallback={<div><FaSpinner className="text-5xl animate-spin" /></div>}>
                    <ResetPassForm />
                </Suspense>
            </div>
        </div>
    );
};

export default ResetPassword;

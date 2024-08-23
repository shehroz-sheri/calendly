import ChangePassForm from "@/app/(components)/changePassForm/ChangePassForm";
import LoadingSpinner from "@/app/(components)/loadingSpinner/LoadingSpinner";
import ProfileSidebar from "@/app/(components)/profileSidebar/ProfileSidebar";
import { Suspense } from "react";

export const metadata = {
  title: "Change Password - Calendly",
  description:
    "Update your password to secure your Calendly account and maintain your privacy.",
  openGraph: {
    title: "Change Password - Calendly",
    description:
      "Update your password to secure your Calendly account and maintain your privacy.",
    url: "https://calendly-by-shehroz.vercel.app/change-password",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Change Password - Calendly",
      },
    ],
  },
};

const ChangePassword = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex">
          <ProfileSidebar />
          <main className="flex-grow bg-light min-h-screen">
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-[95%] max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">
                  Change Password
                </h2>
                <ChangePassForm />
              </div>
            </div>
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default ChangePassword;

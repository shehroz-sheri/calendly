import AccDetails from "@/app/(components)/accDetails/AccDetails";
import LoadingSpinner from "@/app/(components)/loadingSpinner/LoadingSpinner";
import ProfileSidebar from "@/app/(components)/profileSidebar/ProfileSidebar";
import UserDropdown from "@/app/(components)/userDropdown/UserDropdown";
import { Suspense } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";

export const metadata = {
  title: "User Profile - Calendly",
  description:
    "View and update your personal information, profile settings, and preferences on your Calendly profile.",
  openGraph: {
    title: "User Profile - Calendly",
    description:
      "View and update your personal information, profile settings, and preferences on your Calendly profile.",
    url: "https://calendly-by-shehroz.vercel.app/profile",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "User Profile - Calendly",
      },
    ],
  },
};

const EditProfile: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex">
          <div className="fixed z-50">
            <ProfileSidebar />
          </div>
          <main className="flex-grow bg-light min-h-screen lg:ml-64">
            <div className="py-2 px-3 lg:text-end">
              <button className="border border-primary rounded-[40px] font-semibold text-[13px] text-primary py-2 px-3 hover:bg-gray-200">
                <HiOutlineUserAdd className="inline mr-1 text-primary" /> Invite
                User
              </button>
              <UserDropdown />
            </div>
            <AccDetails />
          </main>
        </div>
      </Suspense>
    </>
  );
};

export default EditProfile;

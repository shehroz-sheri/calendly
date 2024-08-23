import LoadingSpinner from "@/app/(components)/loadingSpinner/LoadingSpinner";
import UserAvailability from "@/app/(components)/userAvailability/UserAvailability";
import { Suspense } from "react";

export const metadata = {
  title: "Set Availability - Calendly",
  description:
    "Easily set your availability and let others know when you are free for meetings.",
  openGraph: {
    title: "Set Availability - Calendly",
    description:
      "Easily set your availability and let others know when you are free for meetings.",
    url: "https://calendly-by-shehroz.vercel.app/availability",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Set Availability - Calendly",
      },
    ],
  },
};

const Availability: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <UserAvailability />
      </Suspense>
    </>
  );
};

export default Availability;

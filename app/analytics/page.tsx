import Link from "next/link";
import AnalyticsSection from "../(components)/analyticsSection/AnalyticsSection";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

export const metadata = {
  title: "Analytics - Calendly",
  description:
    "Gain insights into your appointments with detailed analytics, including visit counts and peak hours.",
  openGraph: {
    title: "Analytics - Calendly",
    description:
      "Gain insights into your appointments with detailed analytics, including visit counts and peak hours.",
    url: "https://calendly-by-shehroz.vercel.app/analytics",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Analytics - Calendly",
      },
    ],
  },
};

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto my-10">
      <Link
        href="/dashboard"
        className="mb-4 inline-block py-3 px-8 w-full text-center rounded bg-success/90 hover:bg-success text-light"
      >
        Go to Dashboard
      </Link>
      <Suspense
        fallback={
          <div>
            <FaSpinner className="text-5xl animate-spin" />
          </div>
        }
      >
        <AnalyticsSection />
      </Suspense>
    </div>
  );
};

export default Analytics;

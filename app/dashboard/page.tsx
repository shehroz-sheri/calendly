import { Suspense } from "react";
import DashboardSection from "../(components)/dashboardSection/DashboardSection";
import LoadingSpinner from "../(components)/loadingSpinner/LoadingSpinner";

export const metadata = {
  title: 'Dashboard - Calendly',
  description: 'Manage your appointments, view upcoming meetings, and customize your scheduling preferences from your dashboard.',
  openGraph: {
    title: 'Dashboard - Calendly',
    description: 'Manage your appointments, view upcoming meetings, and customize your scheduling preferences from your dashboard.',
    url: 'https://calendly-by-shehroz.vercel.app/dashboard',
    images: [
      {
        url: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png',
        width: 1200,
        height: 630,
        alt: 'Dashboard - Calendly',
      },
    ],
  },
};


const Dashboard: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardSection />
    </Suspense>
  );
};

export default Dashboard;

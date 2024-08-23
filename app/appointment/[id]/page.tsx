import { AppointmentHeader } from "@/app/(components)/appointmentHeader/AppointmentHeader";
import AppointmentBody from "@/app/(components)/appointmentBody/AppointmentBody";
import { Suspense } from "react";
import { FaSpinner } from "react-icons/fa";

export const metadata = {
  title: "Appointment Details - Calendly",
  description:
    "View detailed information about your scheduled appointment, including meeting date, time, and participant details.",
  openGraph: {
    title: "Appointment Details - Calendly",
    description:
      "View detailed information about your scheduled appointment, including meeting date, time, and participant details.",
    url: "https://calendly-by-shehroz.vercel.app/appointment",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Appointment Details",
      },
    ],
  },
};

const Appointment: React.FC = () => {
  return (
    <div>
      <AppointmentHeader />
      <Suspense
        fallback={
          <div>
            <FaSpinner className="text-5xl animate-spin" />
          </div>
        }
      >
        <AppointmentBody />
      </Suspense>
    </div>
  );
};

export default Appointment;

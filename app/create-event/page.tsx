import { Suspense } from "react";
import ScheduleEvent from "../(components)/scheduleEvent/ScheduleEvent";
import LoadingSpinner from "../(components)/loadingSpinner/LoadingSpinner";

export const metadata = {
  title: "Create Event - Calendly",
  description:
    "Schedule your meetings effortlessly by creating an event and selecting the perfect date and time.",
  openGraph: {
    title: "Create Event - Calendly",
    description:
      "Schedule your meetings effortlessly by creating an event and selecting the perfect date and time.",
    url: "https://calendly-by-shehroz.vercel.app/create-event",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Create Event - Calendly",
      },
    ],
  },
};

const CreateEvent = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ScheduleEvent />
      </Suspense>
    </>
  );
};

export default CreateEvent;

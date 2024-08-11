import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


export const useCalendar = () => {
  const session = useSession();
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (session.data?.user?.email) {
        try {
          const response = await fetch('/api/event-availability', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.data?.user?.email }),
          });

          if (!response.ok) {
            toast.error("Something went wrong!");
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setAvailableDays(data?.availability?.days);
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
    };

    fetchAvailability();
  }, [session]);

  return {
    availableDays,
    currentMonth,
    selectedDate,
    setCurrentMonth,
    setSelectedDate,
  };
};

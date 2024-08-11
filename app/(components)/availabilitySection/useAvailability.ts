import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { setAvailability } from "@/redux/slices/availabilitySlice";

export const useAvailability = () => {
  const router = useRouter();
  const params = useSearchParams();
  const loginStatus = params.get("login-status");

  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [days, setDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.availability.loading);
  const error = useSelector((state: RootState) => state.availability.error);

  const handleTimeFromChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeFrom(event.target.value);
  };

  const handleTimeToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeTo(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setDays((prevDays) => ({
      ...prevDays,
      [id]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (timeFrom === "" || timeTo === "") {
      setTimeFrom("12:00 am");
      setTimeTo("12:00 am");
    }

    const timeToMinutes = (time: string): number => {
      let [timePart, period] = time.split(" ");

      let hours = parseInt(timePart, 10);

      if (period === "pm" && hours !== 12) {
        hours += 12;
      } else if (period === "am" && hours === 12) {
        hours = 0;
      }
      return hours;
    };

    const fromHours = timeFrom ? timeToMinutes(timeFrom) : 0;
    const toHours = timeTo ? timeToMinutes(timeTo) : 0;

    const selectedDays = Object.keys(days).filter(
      (day) => days[day as keyof typeof days]
    );

    if (!timeFrom || !timeTo || !selectedDays.length)
      return toast.error("All fields are required");

    if (toHours <= fromHours) {
      return toast.error("Time To must be greater than Time From");
    }

    try {
      await dispatch(
        setAvailability({
          availability: { fromHours, toHours, selectedDays },
        })
      ).unwrap();
      toast.success("Availability set successfully!");

      if (loginStatus) {
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(error || "Something went wrong! Please try again.");
    }
  };

  return {
    days,
    loginStatus,
    loading,
    handleTimeFromChange,
    handleTimeToChange,
    handleCheckboxChange,
    handleSubmit,
  };
};

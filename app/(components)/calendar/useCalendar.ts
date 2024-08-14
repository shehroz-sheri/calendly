import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchEventAvailability } from "@/redux/slices/eventAvailabilitySlice";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks/hooks";

export const useCalendar = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector(
    (state: RootState) => state?.eventAvailability?.loading
  );
  const error = useSelector(
    (state: RootState) => state?.eventAvailability?.error
  );

  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchAndSetAvailability = async () => {
      const result = await dispatch(fetchEventAvailability());

      if (fetchEventAvailability.fulfilled.match(result)) {
        setAvailableDays(result?.payload || []);
      }
    };

    fetchAndSetAvailability();
  }, [dispatch]);

  return {
    availableDays,
    loading,
    error,
    currentMonth,
    selectedDate,
    setCurrentMonth,
    setSelectedDate,
  };
};

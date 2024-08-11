import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchAnalytics } from "@/redux/slices/analyticsSlice";

export const useAnalytics = () => {
  const dispatch = useAppDispatch();
  const { visitData, peakHoursData, loading } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const visitChartData = {
    labels: Object.keys(visitData),
    datasets: [
      {
        label: "Number of Visits",
        data: Object.values(visitData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const peakHoursChartData = {
    labels: Object.keys(peakHoursData).map((hour) => `${hour}:00`),
    datasets: [
      {
        label: "Peak Hours",
        data: Object.values(peakHoursData),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return {
    visitChartData,
    peakHoursChartData,
    loading,
    visitData,
    peakHoursData,
  };
};

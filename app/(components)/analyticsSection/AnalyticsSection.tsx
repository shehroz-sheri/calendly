"use client";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAnalytics } from "./useAnalytics";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsSection: React.FC = () => {
  const {
    visitChartData,
    peakHoursChartData,
    loading,
    visitData,
    peakHoursData,
  } = useAnalytics();

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="text-3xl font-bold mb-7 text-center text-dark rounded bg-light py-2">
        Analytics Dashboard
      </h1>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Visit Counts</h2>
        {Object.keys(visitData)?.length ? (
          <Bar data={visitChartData} />
        ) : (
          <p>No visit data available.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-3">Peak Hours</h2>
        {Object.keys(peakHoursData)?.length ? (
          <Bar data={peakHoursChartData} />
        ) : (
          <p>No peak hour data available.</p>
        )}
      </div>
    </>
  );
};

export default AnalyticsSection;

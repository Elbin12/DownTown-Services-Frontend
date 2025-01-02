import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register all required components
ChartJS.register(...registerables);

const SalesChart = () => {
  const data = {
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    datasets: [
      {
        label: "Last 6 days",
        data: [400, 300, 500, 600, 800, 700, 400, 500, 450, 300, 700, 800],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Last Week",
        data: [200, 250, 300, 400, 500, 350, 300, 450, 350, 200, 450, 600],
        backgroundColor: "rgba(200, 200, 200, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesChart;

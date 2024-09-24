"use client";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TrendChart = ({ keyword }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch(
        "/api/googletrend/interest-over-time?keyword=" +
          keyword
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      let resData = await res.json();
      setData(resData);
    }
    fetchPosts();
  }, [keyword]);

  if (!data) return <div className="text-neutral-500">Loading...</div>;

  const labels = data.map((item) => item.formattedTime);
  const values = data.map((item) => item.value[0]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Keyword Trend",
        data: values,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
        ticks: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "Value",
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TrendChart;

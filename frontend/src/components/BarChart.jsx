import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/barchart", { params: { month } });
        setBarData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarData();
  }, [month]);

  const data = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: barData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Price Range Distribution for ${month}`,
      },
    },
  };

  return (
    <div className="mt-4">
      <h2 className="text-center">Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

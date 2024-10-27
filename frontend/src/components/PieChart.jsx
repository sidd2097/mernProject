import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/piechart", { params: { month } });
        setPieData(response.data);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieData();
  }, [month]);

  const data = {
    labels: pieData.map((item) => item._id),
    datasets: [
      {
        label: "Number of Items",
        data: pieData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 4,
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
        text: `Category Distribution for ${month}`,
      },
    },
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;

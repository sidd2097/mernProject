import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/statistics", { params: { month } });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics for {month}</h2>
      <div>
        <p>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</p>
        <p>Total Sold Items: {statistics.soldItems}</p>
        <p>Total Unsold Items: {statistics.notSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;

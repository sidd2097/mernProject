import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  return (
    <div className="container mt-4">
      <h1 className="text-center">Transactions Dashboard</h1>
      <label>
        Select Month:
        <select 
          className="form-select" 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </label>

      <Statistics month={selectedMonth} />
      <TransactionsTable month={selectedMonth} />
      <BarChart month={selectedMonth} />
      <PieChart month={selectedMonth} />
    </div>
  );
};

export default App;

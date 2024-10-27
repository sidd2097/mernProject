import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get("http://localhost:8082/api/transactions", {
        params: { page, search, month }
      });
      setTransactions(response.data.transactions);
    };

    fetchTransactions();
  }, [page, search, month]);

  return (
    <div className="mt-4">
      <h2 className="text-center">Transactions Table</h2>
      <input 
        className="form-control mb-3" 
        placeholder="Search transactions" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;

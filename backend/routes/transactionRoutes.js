const express = require("express");
const router = express.Router();
const {
  initializeDatabase,
  getTransactions,
  getStatistics
  // Add other controller functions as needed
} = require("../controllers/transactionController");

router.get("/initialize", initializeDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
// Add other routes here

module.exports = router;

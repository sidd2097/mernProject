const Transaction = require("../models/Transaction");
const axios = require("axios");

exports.initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { price: parseFloat(search) }
    ];
  }

  if (month) {
    const monthNumber = new Date(`${month} 1, 2023`).getMonth();
    query.dateOfSale = { $gte: new Date(2023, monthNumber, 1), $lt: new Date(2023, monthNumber + 1, 1) };
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));
  const total = await Transaction.countDocuments(query);

  res.json({ transactions, total });
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(`${month} 1, 2023`).getMonth();

  const stats = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: new Date(2023, monthNumber, 1), $lt: new Date(2023, monthNumber + 1, 1) } } },
    {
      $facet: {
        totalSaleAmount: [{ $group: { _id: null, total: { $sum: "$price" } } }],
        soldItems: [{ $match: { isSold: true } }, { $count: "count" }],
        notSoldItems: [{ $match: { isSold: false } }, { $count: "count" }]
      }
    }
  ]);

  res.json({
    totalSaleAmount: stats[0].totalSaleAmount[0]?.total || 0,
    soldItems: stats[0].soldItems[0]?.count || 0,
    notSoldItems: stats[0].notSoldItems[0]?.count || 0
  });
};

// Other controller methods for bar chart, pie chart, and combined APIs would follow similar patterns

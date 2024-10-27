const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/qkart", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api", transactionRoutes);

app.listen(8082, () => console.log("Server running on port 8082"));

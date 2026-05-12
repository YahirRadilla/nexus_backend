import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import clientRoutes from "./routes/clientRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/clients", clientRoutes);

app.use("/api/accounts", accountRoutes);

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDatabase } from "./config/database.js";

import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

app.use("/api", accountRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
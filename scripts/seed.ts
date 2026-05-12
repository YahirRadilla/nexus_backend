import mongoose from "mongoose";
import dotenv from "dotenv";

import Client from "../src/models/Client.js";
import Account from "../src/models/Account.js";
import Transaction from "../src/models/Transaction.js";

dotenv.config();

const seedDatabase = async (): Promise<void> => {

    try {

        await mongoose.connect(process.env.MONGO_URI as string);

        console.log("MongoDB connected");

        await Client.deleteMany({});
        await Account.deleteMany({});
        await Transaction.deleteMany({});

        const clients = await Client.insertMany([
            {
                name: "Juan Perez",
                curp: "PEPJ010101HDFRRN01",
                email: "juanperez@gmail.com",
                phone: "6121234567",
                address: "La Paz, Baja California Sur",
                createdAt: new Date(),
                status: true
            },
            {
                name: "Maria Lopez",
                curp: "LOPM020202MDFRRN02",
                email: "marialopez@gmail.com",
                phone: "6127654321",
                address: "Los Cabos, Baja California Sur",
                createdAt: new Date(),
                status: true
            },
            {
                name: "Carlos Ramirez",
                curp: "RACJ990303HDFRRN03",
                email: "carlosramirez@gmail.com",
                phone: "6129876543",
                address: "Comondú, Baja California Sur",
                createdAt: new Date(),
                status: true
            }
        ]);

        await Account.insertMany([
            {
                clientId: clients[0]!._id,
                accountNumber: "001",
                accountType: "Savings",
                balance: 5000,
                currency: "MXN",
                createdAt: new Date(),
                status: "Active"
            },
            {
                clientId: clients[1]!._id,
                accountNumber: "002",
                accountType: "Checking",
                balance: 8200,
                currency: "MXN",
                createdAt: new Date(),
                status: "Active"
            },
            {
                clientId: clients[2]!._id,
                accountNumber: "003",
                accountType: "Savings",
                balance: 12000,
                currency: "MXN",
                createdAt: new Date(),
                status: "Active"
            }
        ]);

        await Transaction.insertMany([
            {
                fromAccount: null,
                toAccount: "001",
                type: "Deposit",
                amount: 1000,
                description: "Cash deposit",
                date: new Date(),
                status: "Completed"
            },
            {
                fromAccount: "001",
                toAccount: null,
                type: "Withdraw",
                amount: 500,
                description: "ATM withdrawal",
                date: new Date(),
                status: "Completed"
            },
            {
                fromAccount: null,
                toAccount: "002",
                type: "Deposit",
                amount: 2200,
                description: "Transfer received",
                date: new Date(),
                status: "Completed"
            },
            {
                fromAccount: "003",
                toAccount: "001",
                type: "Transfer",
                amount: 1500,
                description: "Transfer to Juan Perez",
                date: new Date(),
                status: "Completed"
            }
        ]);

        console.log("Database seeded successfully");

        process.exit(0);

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

seedDatabase();
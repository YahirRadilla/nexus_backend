import type {
    Request,
    Response
} from "express";

import bcrypt from "bcryptjs";

import Client from "../models/Client.js";
import Account from "../models/Account.js";

import {
    getNextAccountNumber
} from "../utils/accountGenerator.js";

import {
    generateToken
} from "../utils/jwt.js";

import type {
    AuthRequest
} from "../middlewares/authMiddleware.js";
import { createAuditLog } from "../utils/audit.js";

import { registerSchema, loginSchema } from "../validators/authValidator.js";

export const register = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const validation =
            registerSchema.safeParse(
                req.body
            );

        if (!validation.success) {

            res.status(400).json({
                errors:
                    validation.error.flatten()
            });

            return;
        }

        const {
            name,
            curp,
            email,
            password,
            phone,
            address
        } = req.body;

        const existingClient =
            await Client.findOne({
                $or: [
                    { email },
                    { curp }
                ]
            });

        if (existingClient) {

            res.status(400).json({
                message:
                    "Client already exists"
            });

            return;
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const client =
            await Client.create({
                name,
                curp,
                email,
                password:
                    hashedPassword,
                phone,
                address
            });

        const accountNumber =
            await getNextAccountNumber();

        const account =
            await Account.create({
                clientId: client._id,
                accountNumber,
                accountType:
                    "Savings",
                balance: 0,
                currency: "MXN"
            });

        const token =
            generateToken(
                client._id.toString()
            );

        res.status(201).json({
            message:
                "User registered successfully",
            token,
            client: {
                id: client._id,
                name: client.name,
                email: client.email
            },
            account: {
                accountNumber:
                    account.accountNumber,
                balance:
                    account.balance
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error registering user"
        });

    }

};

export const login = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const validation =
            loginSchema.safeParse(
                req.body
            );

        if (!validation.success) {

            res.status(400).json({
                errors:
                    validation.error.flatten()
            });

            return;
        }

        const {
            email,
            password
        } = req.body;

        const client =
            await Client.findOne({
                email
            }).select("+password");

        if (!client) {

            res.status(401).json({
                message:
                    "Invalid credentials"
            });

            await createAuditLog(
                "LOGIN_FAILED",
                `Failed login attempt for ${email}`
            );

            return;
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                client.password
            );

        if (!passwordMatch) {

            res.status(401).json({
                message:
                    "Invalid credentials"
            });

            await createAuditLog(
                "LOGIN_FAILED",
                `Failed login attempt for ${email}`
            );

            return;
        }

        const token =
            generateToken(
                client._id.toString()
            );

        await createAuditLog(
            "LOGIN_SUCCESS",
            `User ${client.email} logged in`,
            client._id.toString()
        );

        res.json({
            token,
            client: {
                id: client._id,
                name: client.name,
                email: client.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error logging in"
        });

    }

};

export const me = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const client =
            await Client.findById(
                req.clientId
            );

        if (!client) {

            res.status(404).json({
                message:
                    "Client not found"
            });

            return;
        }

        const account =
            await Account.findOne({
                clientId:
                    client._id
            });

        res.json({
            client,
            account
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Error getting user"
        });

    }

};
import { Router, type Request, type Response } from "express";

import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get(
    "/account/:account",
    async (req: Request, res: Response): Promise<any> => {

        try {

            const accountNumber = req.params.account as string;

            const account = await Account.findOne({
                accountNumber
            });

            if (!account) {
                return res.status(404).json({
                    message: "Account not found"
                });
            }

            const transactions = await Transaction.find({
                accountNumber: account.accountNumber
            });

            return res.json({
                client: account.clientName,
                accountNumber: account.accountNumber,
                balance: account.balance,
                transactions
            });

        } catch (error) {

            return res.status(500).json({
                message: "Server error"
            });

        }
    }
);

export default router;
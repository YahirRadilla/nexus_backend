import express from "express";

import {
    getAccounts,
    createAccount,
    getAccountDetails
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/", getAccounts);

router.get("/:cuenta", getAccountDetails);


router.post("/", createAccount);

export default router;
import express from "express";

import {
    createBeneficiary,
    getBeneficiaries,
    deleteBeneficiary
} from "../controllers/BeneficiaryController.js";

import {
    authenticate
} from "../middlewares/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    authenticate,
    createBeneficiary
);

router.get(
    "/",
    authenticate,
    getBeneficiaries
);

router.delete(
    "/:id",
    authenticate,
    deleteBeneficiary
);

export default router;
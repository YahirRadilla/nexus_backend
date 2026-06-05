import mongoose from "mongoose";

import AuditLog from "../models/AuditLog.js";

export const createAuditLog =
    async (
        action: string,
        details: string,
        clientId?: string
    ): Promise<void> => {

        const data: {
            action: string;
            details: string;
            clientId?: mongoose.Types.ObjectId;
        } = {
            action,
            details
        };

        if (clientId) {

            data.clientId =
                new mongoose.Types.ObjectId(
                    clientId
                );
        }

        await AuditLog.create(data);

    };
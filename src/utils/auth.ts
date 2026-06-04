import type {
    AuthRequest
} from "../middlewares/authMiddleware.js";

export const getClientId = (
    req: AuthRequest
): string => {

    if (!req.clientId) {
        throw new Error(
            "ClientId not found"
        );
    }

    return req.clientId;
};
import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest
    extends Request {

    clientId?: string;
}

interface TokenPayload {
    clientId: string;
}

const JWT_SECRET =
    process.env.JWT_SECRET ?? "dev-secret";

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            res.status(401).json({
                message: "Token required"
            });

            return;
        }

        const token =
            authHeader.split(" ")[1];

        if (!token) {

            res.status(401).json({
                message: "Token required"
            });

            return;
        }

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            ) as TokenPayload;

        req.clientId =
            decoded.clientId;

        next();

    } catch {

        res.status(401).json({
            message: "Invalid token"
        });

    }

};
import jwt from "jsonwebtoken";

const JWT_SECRET =
    process.env.JWT_SECRET ||
    "dev-secret";

export const generateToken = (
    clientId: string
): string => {

    return jwt.sign(
        { clientId },
        JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

};
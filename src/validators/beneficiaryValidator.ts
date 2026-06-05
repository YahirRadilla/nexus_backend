import { z } from "zod";

export const beneficiarySchema =
    z.object({

        accountNumber:
            z.string()
                .length(10),

        alias:
            z.string()
                .min(2)
                .max(50)

    });
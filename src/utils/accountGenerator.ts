import Counter from "../models/Counter.js";

export const calculateVerifierDigit = (
    baseNumber: string
): number => {

    const sum = baseNumber
        .split("")
        .reduce(
            (acc, digit) =>
                acc + Number(digit),
            0
        );

    return sum % 10;
};

export const getNextAccountNumber =
    async (): Promise<string> => {

        const counter =
            await Counter.findOneAndUpdate(
                {
                    name: "account"
                },
                {
                    $inc: {
                        value: 1
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );

        const sequential =
            counter.value
                .toString()
                .padStart(6, "0");

        const base =
            `180${sequential}`;

        const verifier =
            calculateVerifierDigit(base);

        return `${base}${verifier}`;
    };
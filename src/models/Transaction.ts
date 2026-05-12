import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    fromAccount: string | null;
    toAccount: string | null;
    type: string;
    amount: number;
    description: string;
    date: Date;
    status: string;
}

const TransactionSchema: Schema = new Schema({
    fromAccount: {
        type: String,
        default: null
    },
    toAccount: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Completed"
    }
});

export default mongoose.model<ITransaction>(
    "Transaction",
    TransactionSchema
);
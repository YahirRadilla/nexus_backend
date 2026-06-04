import mongoose, {
    Schema,
    Document
} from "mongoose";

export interface IBeneficiary
    extends Document {

    ownerId: mongoose.Types.ObjectId;

    accountNumber: string;

    alias: string;

    createdAt: Date;
}

const BeneficiarySchema =
    new Schema({

        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },

        accountNumber: {
            type: String,
            required: true,
            match: /^\d{10}$/
        },

        alias: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    });

export default mongoose.model<IBeneficiary>(
    "Beneficiary",
    BeneficiarySchema
);
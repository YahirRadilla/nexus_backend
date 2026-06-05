import mongoose, {
    Schema,
    Document
} from "mongoose";

export interface IAuditLog
    extends Document {

    clientId?:
        mongoose.Types.ObjectId;

    action: string;

    details: string;

    createdAt: Date;
}

const AuditLogSchema =
    new Schema({

        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: false
        },

        action: {
            type: String,
            required: true
        },

        details: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    });

export default mongoose.model<IAuditLog>(
    "AuditLog",
    AuditLogSchema
);
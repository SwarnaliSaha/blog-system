import { Schema, model, Document } from "mongoose";

const RefreshTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true }, // store hashed token if preferred
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
}, { timestamps: true });

type RefreshTokenDocument = Document & any;
export const RefreshTokenModel = model<RefreshTokenDocument>("RefreshToken", RefreshTokenSchema);

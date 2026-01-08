import { IUser } from "./user.type";
import { Schema, model, Document } from "mongoose";
import { BaseSchema } from "../../utility/base-schema";

const UserSchema = new BaseSchema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
});


type UserDocument = Document & IUser & { comparePassword?: (cand: string) => Promise<boolean> };
export const UserModel = model<UserDocument>("User", UserSchema);
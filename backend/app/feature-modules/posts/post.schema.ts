import { IPost } from "./post.type";
import { Schema, model, Document } from "mongoose";
import { BaseSchema } from "../../utility/base-schema";

const PostSchema = new BaseSchema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
});

type PostDocument = Document & IPost;
export const PostModel = model<PostDocument>("Post", PostSchema);

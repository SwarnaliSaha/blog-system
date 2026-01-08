import { Schema, model, Document } from "mongoose";
import { BaseSchema } from "../../utility/base-schema";

const CommentSchema = new BaseSchema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    // soft-delete is inherited from BaseSchema
});

type CommentDocument = Document & any;
export const CommentModel = model<CommentDocument>("Comment", CommentSchema);

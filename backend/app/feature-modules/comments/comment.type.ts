import { ObjectId } from "bson";

export interface IComment{
    _id?: ObjectId,
    content: string,
    author?: ObjectId,
    post?: ObjectId,
    isDeleted?: boolean
}

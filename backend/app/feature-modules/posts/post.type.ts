import { ObjectId } from "bson";

export interface IPost{
    _id?: ObjectId,
    title: string,
    content: string,
    author?: ObjectId,
    slug?: string,
    isDeleted?: boolean
}

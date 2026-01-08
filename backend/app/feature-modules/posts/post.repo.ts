import { PostModel } from "./post.schema";
import { IPost } from "./post.type";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (post: IPost) => PostModel.create(post);

const updateOne = async (filter: FilterQuery<IPost>, update: UpdateQuery<IPost>) => {
    return PostModel.updateOne(filter, update);
}

const findOne = async (filters: Partial<IPost>) => {
    return await PostModel.findOne({
        ...filters,
        isDeleted: false
    })
}

const find = (pipeline: any) => PostModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
}

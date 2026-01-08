import { FilterQuery, Types, UpdateQuery } from "mongoose";
import postRepo from "./post.repo";
import { post_responses } from "./post.response";
import { IPost } from "./post.type";
import { createPipeline } from "../../utility/pipeline";

const createPost = async (post: IPost) => {
    const record = await postRepo.create(post);
    if (!record) throw post_responses.post_not_created;
    return post_responses.post_created;
}

const updateOne = (filter: FilterQuery<IPost>, update: UpdateQuery<IPost>) => {
    return postRepo.updateOne(filter, update);
}

const updatePost = async (postId: string, updateObject: object) => {
    const updated = await postRepo.updateOne(
        { _id: new Types.ObjectId(postId) },
        { $set: updateObject }
    )
    if (!updated) throw post_responses.post_not_updated;
    return post_responses.post_updated;
}

const deletePost = async (postId: string) => {
    const deleted = await postRepo.updateOne(
        { _id: postId },
        { $set: { isDeleted: true } }
    )
    if (!deleted) throw post_responses.post_not_deleted;
    return post_responses.post_deleted;
}

const findPost = async (filter: Partial<IPost>) => {
    const found = await postRepo.findOne(filter);
    if (!found) throw post_responses.post_not_found;
    return found;
}

const ViewAllPosts = async (query: any) => {
    const { _id, ...filter } = query;
    const pipeline = createPipeline(filter);
    const aggregate: any[] = [];
    if (_id) {
        aggregate.push({ $match: { _id: new Types.ObjectId(_id) } })
    }
    aggregate.push(...pipeline);
    const result = await postRepo.find(aggregate);
    return result;
}

export default {
    createPost,
    updateOne,
    updatePost,
    deletePost,
    findPost,
    ViewAllPosts
}

import { FilterQuery, Types, UpdateQuery } from "mongoose";
import commentRepo from "./comment.repo";
import { comment_responses } from "./comment.response";
import { IComment } from "./comment.type";
import { createPipeline } from "../../utility/pipeline";

const createComment = async (comment: IComment) => {
    const record = await commentRepo.create(comment);
    if (!record) throw comment_responses.comment_not_created;
    return comment_responses.comment_created;
}

const updateOne = (filter: FilterQuery<IComment>, update: UpdateQuery<IComment>) => {
    return commentRepo.updateOne(filter, update);
}

const updateComment = async (commentId: string, updateObject: object) => {
    const updated = await commentRepo.updateOne(
        { _id: new Types.ObjectId(commentId) },
        { $set: updateObject }
    )
    if (!updated) throw comment_responses.comment_not_updated;
    return comment_responses.comment_updated;
}

const deleteComment = async (commentId: string) => {
    const deleted = await commentRepo.updateOne(
        { _id: commentId },
        { $set: { isDeleted: true } }
    )
    if (!deleted) throw comment_responses.comment_not_deleted;
    return comment_responses.comment_deleted;
}

const findComment = async (filter: Partial<IComment>) => {
    const found = await commentRepo.findOne(filter);
    if (!found) throw comment_responses.comment_not_found;
    return found;
}

const ViewAllComments = async (query: any) => {
    const { _id, ...filter } = query;
    const pipeline = createPipeline(filter);
    const aggregate: any[] = [];
    if (_id) {
        aggregate.push({ $match: { _id: new Types.ObjectId(_id) } })
    }
    aggregate.push(...pipeline);
    const result = await commentRepo.find(aggregate);
    return result;
}

export default {
    createComment,
    updateOne,
    updateComment,
    deleteComment,
    findComment,
    ViewAllComments
}

import { FilterQuery, Types, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { user_responses } from "./user.response";
import { IUser } from "./user.type";
import { createPipeline } from "../../utility/pipeline";
import { Roles } from "../role/role.type";

const createUser = async(user:IUser)=>{
    const record = await userRepo.create(user);

    if(!record) throw user_responses.user_not_created;
    return user_responses.user_created
} 

const updateOne = (filter: FilterQuery<IUser>, update: UpdateQuery<IUser>) => {
    return userRepo.updateOne(filter, update)
}

const updateUser = async(userId:string,updateObject:object)=>{
    const updated = await userRepo.updateOne(
        {_id:new Types.ObjectId(userId)},
        {$set: updateObject}
    )

    if(!updated) throw user_responses.user_not_updated;
    return user_responses.user_updated;
}

const deleteUser = async(userId:string)=>{
    const deleted = await userRepo.updateOne(
        {_id:userId},
        {$set : {
            isDeleted : true
        }}
    )

    if(!deleted) throw user_responses.user_not_deleted;
    return user_responses.user_deleted;
}

const findUser = async(filter:Partial<IUser>) => {
    const foundUser = await userRepo.findOne(filter);

    if(!foundUser) throw user_responses.user_not_found;
    return foundUser;
}

const ViewAllUsers = async(query:any)=>{
    const {_id,...filter} = query;

    const pipeline = createPipeline(filter);

    const aggregate = [];

    if(_id){
        aggregate.push({
            $match : {
                _id : new Types.ObjectId(_id)
            }
        })
    }

    aggregate.push(...pipeline)

    const result = await userRepo.find(aggregate);

    return result;
}

export default {
    createUser,
    updateOne,
    updateUser,
    deleteUser,
    findUser,
    ViewAllUsers
}
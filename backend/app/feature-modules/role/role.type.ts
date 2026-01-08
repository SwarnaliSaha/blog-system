import mongoose from "mongoose"

export interface IRole{
    _id:string,
    name:string
}

export const Roles = {
    admin:new mongoose.mongo.ObjectId("69600417493c1a3bb25fdf05"),
    user:new mongoose.mongo.ObjectId("69600422493c1a3bb25fdf07")
}
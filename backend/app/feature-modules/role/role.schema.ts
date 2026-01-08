import { IRole } from "./role.type";
import { BaseSchema } from "../../utility/base-schema";
import { model, Document } from "mongoose";

const RoleSchema = new BaseSchema({
    name:{
        type:String,
        required:true,
        index:true,
        unique:true,
    }
});

type RoleDocument = Document & IRole;
export const RoleModel = model<RoleDocument>("Role", RoleSchema);
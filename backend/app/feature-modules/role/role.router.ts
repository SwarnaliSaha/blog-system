import { NextFunction, Router, Request,Response } from "express";
import roleService from "./role.service";
import { ResponseHandler } from "../../utility/response-handler";

const router = Router();

router.post('/',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await roleService.create(req.body);
        // roleRepo.create -> RoleModel.create already persists the document.
        // Don't call .save() again (that causes a duplicate-key error for unique fields).
        res.send(new ResponseHandler(result))
    }
    catch(error){
        next(error)
    }
})

export default router;

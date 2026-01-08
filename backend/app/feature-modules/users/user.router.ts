import {Router , Request,Response,NextFunction} from "express"
import userService from "./user.service";
import { ResponseHandler } from "../../utility/response-handler";

const router = Router();

router.get('/getAllUsers',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await userService.ViewAllUsers(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        console.log(error)
        next(error);
    }
})

router.delete('/deleteUser',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.body.userId;
        const result = await userService.deleteUser(userId);
        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;
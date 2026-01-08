import {Router , Request,Response,NextFunction} from "express"
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/response-handler";
import path from 'path'

const router = Router();
  
router.post('/registerUser',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await authService.registerUser(req.body);
        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await authService.login(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;
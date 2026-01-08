import { Router, Request, Response, NextFunction } from "express";
import commentService from "./comment.service";
import { ResponseHandler } from "../../utility/response-handler";

const router = Router();

router.get('/getAllComments', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await commentService.ViewAllComments(query);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteComment', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId = req.body.commentId;
        const result = await commentService.deleteComment(commentId);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router;

import { Router, Request, Response, NextFunction } from "express";
import postService from "./post.service";
import { ResponseHandler } from "../../utility/response-handler";

const router = Router();

router.get('/getAllPosts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await postService.ViewAllPosts(query);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.delete('/deletePost', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.body.postId;
        const result = await postService.deletePost(postId);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router;

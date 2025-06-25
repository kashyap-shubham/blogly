import { Router } from "express";
import { 
    getAllBlogs, 
    postBlog, 
    userBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog,
    addComment,
    getComments
} from "../controllers/blog.controllers.js";
import { userAuth } from "../middleware/userAuth.js";


export const blogRouter = Router();

blogRouter.route("/getallblogs").get(getAllBlogs);
blogRouter.route("/userblogs").get(userAuth, userBlogs);
blogRouter.route("/postblogs").post(userAuth, postBlog);




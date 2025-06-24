import { Router } from "express";
import { getAllBlogs, postBlog, userBlogs } from "../controllers/blog.controllers.js";


export const blogRouter = Router();

blogRouter.route("/getallblogs").get(getAllBlogs);
blogRouter.route("/userblogs").get(userBlogs);
blogRouter.route("/postblogs").post(postBlog);




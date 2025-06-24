import { Router } from "express";
import { getAllBlogs, userBlogs } from "../controllers/blog.controllers.js";


export const blogRouter = Router();

blogRouter.route("/getallblogs").get(getAllBlogs);
blogRouter.route("/userblogs").get(userBlogs);




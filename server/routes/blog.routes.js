import { Router } from "express";

export const blogRouter = Router();

blogRouter.route("/getallblogs").get(getAllBlogs);
blogRouter.route("/userblogs").get(userBlogs);




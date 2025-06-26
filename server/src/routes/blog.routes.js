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
import { commentSchema, createBlogSchema, updateBlogSchema } from "../validator/blogSchema.js";
import { validate } from "../middleware/validate.js";


export const blogRouter = Router();

blogRouter.route("/")
    .get(getAllBlogs)
    .post(userAuth, validate(createBlogSchema), postBlog);

blogRouter.route("/my")
    .get(userAuth, userBlogs);

blogRouter.route("/:id")
    .get(getBlogById)
    .put(userAuth, validate(updateBlogSchema), updateBlog)
    .delete(userAuth, deleteBlog);


blogRouter.post("/:id/like", userAuth, likeBlog);
blogRouter.post("/:id/comment", userAuth, validate(commentSchema), addComment);
blogRouter.get("/:id/comments", getComments);




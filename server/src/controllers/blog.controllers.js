import { isValidObjectId } from "mongoose";
import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/apiErrors.js";



export const getAllBlogs = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const blogs = await Blog.find({ published: true })
            .sort({createdAt: -1})
            .skip((page - 1 ) * limit)
            .limit(limit)
            .populate("author", "firstName lastName");

        const total = await Blog.countDocuments({ published: true });

        res.status(200).json({
            message: "Successfull",
            data: blogs,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error while Fetching the Blogs"));
    }
}


export const userBlogs = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blogs = await Blog.find({ author: userId })
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "firstName lastName");

        const total = await Blog.countDocuments( { published: true });

        res.status(200).json({
            message: "Successfull",
            data: blogs,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error whiel fetching the Blogs"));
    }
}


export const postBlog = async (req, res, next) => {

    const { title, description, body, tags, thumbnail, published } = req.body;
    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try{
        const blog = await Blog.create({
            title: title,
            description: description,
            body: body,
            tags: tags,
            thumbnail: thumbnail,
            author: userId,
            published: published
        })

        res.status(201).json({
            message: "Blog posted successfully",
            data: blog
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error Posting the blog"));
    }
}


export const getBlogById = async (req, res, next) => {

    const blogId = req.params.id;

    if (!isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blog = await Blog.findById(blogId).populate("author", "firstName lastName email");
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }

        res.status(200).json({
            message: "Blog Fetched successfully",
            data: blog
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error Fetching blog"));
    }
}


export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!isValidObjectId(userId) && !isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blog = await blog.findbyid(blogId);
        if (!blog) {
            return next(new ApiError(404, "blog not found"));
        }

        if (blog.author.toString() !== userId.toString()) {
            return next(new ApiError(403, "Unathorized to update the blog"));
        }

        const updated = await blog.findbyidandupdate(blogId, req.body, {new: true});

        res.status(200).json({
            message: "blog updated successfully",
            data: updated
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "error updating the blog"));
    }
}


export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!isValidObjectId(userId) && !isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }

        if (blog.author.toString() !== userId.toString()) {
            return next(new ApiError(403, "Unathorized to delete the blog"));
        }

        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error deleting Blog"));
    }
}


export const likeBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!isValidObjectId(userId) && !isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }

        const alreadyLiked = blog.likes.includes(userId.toString());
        if (alreadyLiked) {
            blog.likes.pull(userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();
        res.status(200).json({
            message: alreadyLiked ? "Unliked Blog" : "Liked Blog",
            likes: blog.likes.length
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error liking/unliking the blog"));
    }
}


export const addComment = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user._id;

    if (!isValidObjectId(userId) && !isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    const {text} = req.body;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }

        blog.comments.push({user: userId, text});
        await blog.save();

        res.status(200).json({
            message: "Comment added Successfully",
            comments: blog.comments
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error adding comment"));
    }
}


export const getComments = async (req, res, next) => {
    const blogId = req.params.id;

    if (!isValidObjectId(blogId)) {
        return next(new ApiError(400, "Invalid Id"));
    }

    try {
        const blog = await Blog.findById(blogId).populate("comments.user", "firstName lastName");
        if (!blog) {
            return next(new ApiError(404, "Blog not found"));
        }
        
        res.status(200).json({
            message: "Comments fetched successfully",
            comments: blog.comments
        });

    } catch(error) {
        console.log(error);
        return next(new ApiError(500, "Error fetching comments"));
    }
}



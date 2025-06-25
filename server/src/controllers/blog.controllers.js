import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/apiErrors.js";



export const getAllBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const blogs = await Blog.find({ published: true })
            .sort({createdAt: -1})
            .skip((page - 1 ) * limit)
            .limit(limit)
            .populate("author", "name");

        const total = await Blog.countDocuments({ published: true });

        res.status(200).json({
            message: "Successfull",
            data: blogs,
            totoalPages: Math.ceil(total / limit),
            totalBlogs: total
        });

    } catch(error) {
        console.log(error);
        throw new ApiError(500, "Error while Fetching the Blogs");
    }
}


export const userBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req._id;

    try {
        const blogs = await Blog.find({ author: userId })
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author", "name");

        const total = await Blog.countDocuments( { published: true });

        res.status(200).json({
            message: "Successfull",
            data: blogs,
            totoalPages: Math.ceil(total / limit),
            totalBlogs: total
        });

    } catch(error) {
        console.log(error);
        throw new ApiError(500, "Error whiel fetching the Blogs");
    }
}


export const postBlog = async (req, res) => {

    const { title, description, body, tags, thumbnail, published } = req.body;
    const userId = req._id;

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
            data: Blog
        });

    } catch(error) {
        console.log(error);
        throw new ApiError(500, "Error Posting the blog");
    }
}


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

    // check if the user is authentic or not

    // take out the blog contennt and save it to the blog document.
}
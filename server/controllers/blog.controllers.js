import { Blog } from "../models/blog.model.js"



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
        res.status(500).json({
            message: "Error While Fetching the Blogs"
        });
    }
}


export const userBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const email = req.email;
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
        res.status(500).json({
            message: "Error while fetching the Blogs"
        });
    }
}
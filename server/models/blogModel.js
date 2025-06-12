import mongoose from "mongoose";
import { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String
    }
})

export const Blog = mongoose.model("Blog", blogSchema);
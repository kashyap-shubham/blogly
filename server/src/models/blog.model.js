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
    body: {
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
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            },
        },
    ],
    published: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true, //adds createAt and updateAt fields
}
);

export const Blog = mongoose.model("Blog", blogSchema);
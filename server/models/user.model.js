import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true    
}
);


userSchema.pre("save", async function(next) {
    if (!this.isModified(password)) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.generateToken = async () => {
    const payload = {};

    if (this._id) {
        payload._id = this._id;
    }

    if (this.userName) {
        payload.userName = this.userName;
    }

    return jwt.sign(payload, process.env.USER_JWT, {expiresIn: '1d'});

}


export const User = mongoose.model("User", userSchema);
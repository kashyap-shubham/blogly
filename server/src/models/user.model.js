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
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch(error) {
        console.log(error);
        return "None";
    }
}


userSchema.methods.generateToken = async function() {
    const payload = {};

    try {

        if (this._id) {
            payload._id = this._id;
        }
    
        if (this.firstName) {
            payload.firstName = this.firstName;
        }
    
        if (this.email) {
            payload.email = this.email;
        }
    
        return jwt.sign(payload, process.env.USER_JWT, {expiresIn: '1d'});
    
    } catch(error) {
        console.log(error)
        throw new Error("Token generation failed");
    }
}


export const User = mongoose.model("User", userSchema);
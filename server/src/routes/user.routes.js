import Router  from "express";
import { editProfile, logOut, signIn, signUp } from "../controllers/user.controllers.js";
import { userAuth } from "../middleware/userAuth.js";
import { loginSchema, signupSchema, updateUserSchema } from "../validator/userSchema.js";

export const userRouter = Router();


userRouter.route("/signup").post(validate(signupSchema), signUp);
userRouter.route("/signin").post(validate(loginSchema), signIn);
userRouter.route("/logout").get(userAuth, logOut);
userRouter.route("/editprofile").put(userAuth, validate(updateUserSchema), editProfile);



import Router  from "express";
import { editProfile, logOut, signIn, signUp } from "../controllers/user.controllers.js";

export const userRouter = Router();


userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/logout").get(logOut);
userRouter.route("/editprofile").get(editProfile);



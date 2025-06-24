import Router  from "express";
import { logOut, postBlog, signIn, signUp } from "../controllers/user.controllers.js";

export const userRouter = Router();


userRouter.route("/signup").post(signUp);
userRouter.route("/singin").post(signIn);
userRouter.route("/logout").get(logOut);
userRouter.route("/postblog").post(postBlog);




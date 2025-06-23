import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/user.Controller";

export const userRouter = Router();


userRouter.route("/signup").post(signUp);
userRouter.route("/singin").post(signIn);
userRouter.route("/logout").get(logout);




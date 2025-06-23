import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/user.Controller";

const userRouter = Router();


userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/logout", logout);




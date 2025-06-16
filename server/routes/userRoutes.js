import { Router } from "express";

const userRouter = Router();


userRouter.post("/signup", userSignupController);
userRouter.post("/signin", userSigninController);



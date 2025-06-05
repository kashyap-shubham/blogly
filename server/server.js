require("dotenv").config();
import express from  "express";
import { dbConnect } from "./config/db";

const app = express();
const port = env.process.PORT || 4000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/ap1/v1/admin", adminRouter);
app.use("/ap1/v1/blogs", blogRouter);



const startServer = async () => {
    dbConnect()
    app.listen(port, () => {
        console.log(`Server Started at port ${port}`);
    })
}    


if (require.main === module) {
    startServer();
}
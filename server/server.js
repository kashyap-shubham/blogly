require("dotenv").config();
import express from  "express";
import mongoose from "mongoose";

const app = express();
const port = env.process.PORT || 4000;

app.use(express.json());


const startServer = async () => {
    
    try {
        const response = await mongoose.connect(process.env.DB_URL);
        console.log("Db Connected successfully");
        app.listen(port, () => {
            console.log(`Server Started at port ${port}`)
        })
    } catch(error) {
        console.log(error);
        console.log("Db connection failed closing the server");
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}
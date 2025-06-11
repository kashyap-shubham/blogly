import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = () => {
   mongoose.connect(process.env.DB_URL)
   .then(() => {
    console.log("Db Connected Successfully");
   })
   .catch((error) => {
    console.log(error.message);
    console.log("Db Connection Failed! Closing the Server");
    process.exit(1);
   })
}



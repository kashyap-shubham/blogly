import express from  "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { database } from "./config/db.js";
import { userRouter } from "./routes/user.routes.js";
import { blogRouter } from "./routes/blog.routes.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;


app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes."
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);


app.use(errorHandler);



const startServer = async () => {
    await database.connect();
    
    if (!database.isConnected()) {
       return; 
    }

    app.listen(port, () => {
        console.log(`Server Started at port ${port}`);
    })
}    


// if (require.main === module) {
//     startServer();
// }


if (process.argv[1] === __filename) {
  // This is the entry point
  // Start your app here
  startServer();
}
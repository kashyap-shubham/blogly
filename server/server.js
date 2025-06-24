import express from  "express";
import { database } from "./config/db.js";
import { userRouter } from "./routes/user.routes.js";
import { blogRouter } from "./routes/blog.routes.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/ap1/v1/blogs", blogRouter);



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
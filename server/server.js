import express from  "express";
import { database } from "./config/db.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/ap1/v1/admin", createBlog);
app.use("/ap1/v1/blogs", readBlog);



const startServer = async () => {
    await database.connect();
    
    if (!database.isConnected()) {
       return; 
    }

    app.listen(port, () => {
        console.log(`Server Started at port ${port}`);
    })
}    


if (require.main === module) {
    startServer();
}
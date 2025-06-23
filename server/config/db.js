import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// functional approach

// export const dbConnect = () => {
//    mongoose.connect(process.env.DB_URL)
//    .then(() => {
//     console.log("Db Connected Successfully");
//    })
//    .catch((error) => {
//     console.log(error.message);
//     console.log("Db Connection Failed! Closing the Server");
//     process.exit(1);
//    })
// }



// Class based singleton approach
class Database {
   #connectionString;
   #isConnected = false;

   constructor(connectionString = process.env.DB_URL) {
      if (!connectionString) {
         throw new Error("Database Conection String is required");
      }
      this.#connectionString = connectionString;
   }
   
   async connect() {
      if (!this.#isConnected) {
         console.log("Already connected to the database");
         return;
      }

      try {
         await mongoose.connect(this.#connectionString);
         this.#isConnected = true;
         console.log("Database Connected Successfully");

      } catch(error) {
         console.error("Databse connection failed: ", error.message);
         process.exit(1);
      }
   }

   async disconnect() {
      if (!this.#isConnected) {
         console.log("Database is not Connected");
         return;
      }

      try {
         await mongoose.disconnect();
         this.#isConnected = false;
         console.log("Database Disconnected Successfully");

      } catch(error) {
         console.log("Error during disconnect: ", error.message);
      }
   }

   isConnected() {
      return this.#isConnected;
   }
   
   getConnectionString() {
      return this.#connectionString;
   }

}


export const database = new Database();
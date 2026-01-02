import mongoose from "mongoose";
import { dbName } from "../constants.js";

const dbConnect = async () => {
    try {
        // Safety check to ensure URI exists before attempting connection
        if (!process.env.MONGODB_USER_URI) {
            throw new Error("MONGODB_USER_URI is missing in environment variables");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_USER_URI}/${dbName}`);
        
        // Corrected the log to show HOST, not PORT
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } 
    catch (err) {
        console.log("MONGODB connection FAILED ", err);
        process.exit(1);
    }
}

export default dbConnect;
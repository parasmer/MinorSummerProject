import dotenv from "dotenv"
 import dbConnect from "./db/index.js"
import app from "./app.js"
const PORT = process.env.PORT_NO || 8000;
dotenv.config({
    path:'./.env'
});
dbConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`db connection successfull and server is running successfully at PORT:${PORT}`)
    });
})
.catch((error)=>{
    console.log("MONGODB connection failed",error);
})
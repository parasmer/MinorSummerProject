import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
});
const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN, // Your actual Vercel frontend domain
    credentials: true 
}));


app.use(express.json({ limit: "16kb" }));


app.use(express.urlencoded({extended: true, limit: "16kb"}));


app.use(cookieParser());


import userRouter from "./routes/user.routes.js";
import accidentRouter from "./routes/accident.routes.js";
import routepathRouter from "./routes/routepath.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/routepath", routepathRouter);
app.use("/api/v1/accidents",accidentRouter);
export default app;

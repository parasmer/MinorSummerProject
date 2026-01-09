import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
});
const app = express()

// 1. CORS must be the FIRST middleware to handle pre-flight requests
app.use(cors({
   origin:process.env.CORS_ORIGIN, 
  credentials: true
}))

// 2. Parse JSON (This fixes 'req.body' undefined)
app.use(express.json({ limit: "16kb" }));

// 3. Parse URL-encoded data (for forms)
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// 4. Parse Cookies (Only need this once)
app.use(cookieParser());

// 5. Routes
import userRouter from "./routes/user.routes.js";
import accidentRouter from "./routes/accident.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/accidents",accidentRouter);
export default app;
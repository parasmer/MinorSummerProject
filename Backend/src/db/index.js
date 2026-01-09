import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const authDB = mongoose.createConnection(
  process.env.MONGODB_USER_URI
);

authDB.on("connected", () => {
  console.log("Connected to AUTH database");
});

authDB.on("error", (err) => {
  console.error(" AUTH DB error:", err);
});

export const accidentDB = mongoose.createConnection(
  process.env.MONGODB_ACCIDENT_URI
);

accidentDB.on("connected", () => {
  console.log("Connected to ACCIDENT database");
});
console.log("ENV CHECK →", {
  USER: process.env.MONGODB_USER_URI,
  ACCIDENT: process.env.MONGODB_ACCIDENT_URI,
});
accidentDB.on("error", (err) => {
  console.error("ACCIDENT DB error:", err);
});

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT_NO || 8000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




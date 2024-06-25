import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./src/config/index.js";
import app from "./src/app.js";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(config.DB);
    console.log("DATABASE CONNECTED SUCCESSFULLY");

    app.on("error", (error) => {
      console.log("ERROR", error);
    });

    app.listen(config.PORT, () => {
        console.log(`BLOG HUB SERVER LISTENING ON http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("ERROR :", error);
    throw error;
  }
})();



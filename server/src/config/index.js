import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1h",
};

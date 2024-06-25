import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT : process.env.PORT,
    DB : process.env.DB_URL
}
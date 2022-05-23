import dotenv from 'dotenv';

dotenv.config();

export default{
  PORT: process.env.PORT ?  parseInt(process.env.PORT)  : 2000,
  MONGODB_URL: process.env.MONGODB_URL ? process.env.MONGODB_URL : "",
  JWT_SECRET:process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
  SALT_WORK_FACTOR:process.env.SALT_WORK_FACTOR ? parseInt(process.env.SALT_WORK_FACTOR):5
}
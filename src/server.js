 import express  from "express";
 import dotenv from "dotenv";
 import mongoose from "mongoose";
 import { router } from "./Routes/mentee.user.routes.js";
 import cors from "cors";
 import { errorHandlerMiddleware } from "./middlewares/errorhandlers.js";


dotenv.config()
 const app = express();


 
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cors());
 app.use(errorHandlerMiddleware);
 
 const PORT = process.env.PORT
 const mongoURI = process.env.MONGO_URI;
 await mongoose.connect(mongoURI);

 app.use(router)

 app.listen (PORT, () => {
console.log(`express app is running ${PORT}`)
 } ) 
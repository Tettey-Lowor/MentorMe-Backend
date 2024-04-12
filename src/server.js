 import express  from "express";

 
dotenv.config()
 const app = express();


 const PORT = process.env.PORT 
 app.listen (PORT, () => {
console.log(`express app is running ${PORT}`)
 } ) 
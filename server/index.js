import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Router from "./routes/route.js";
import Connection from "./database/db.js";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",Router);

app.listen(port,()=>{
    console.log(`Server Started At ${port}`)
})

Connection(process.env.DB_USERNAME,process.env.DB_PASSWORD);
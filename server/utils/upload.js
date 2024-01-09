import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wemydzg.mongodb.net/?retryWrites=true&w=majority`,
    file:(req, file) =>{
        const match = ["image/png","image/jpg"];

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return{
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`,
        }
    }
})

export default multer({storage}); 
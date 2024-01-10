import express from "express";
import {signUpUser,loginUser} from "../controller/user-controller.js";
import createpost,{getAllPosts,getPostById} from "../controller/post-controller.js";
import authenticateToken from "../controller/jwt-controller.js";
import uploadImage , {getImage} from "../controller/image-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();


router.post("/signUp", signUpUser);
router.post("/login", loginUser);
router.post("/file/upload",upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);
router.post('/createPost',authenticateToken,createpost);
router.get('/posts',authenticateToken,getAllPosts)
router.get('/postById',authenticateToken,getPostById)

export default router;
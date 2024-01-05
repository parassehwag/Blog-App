import express from "express";
import {signUpUser} from "../controller/user-controller.js";


const router = express.Router();


router.post("/signUp", signUpUser);

export default router;
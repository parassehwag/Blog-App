import User from "../model/user.js";
import bcrypt from "bcrypt";



const signUpUser = async(req,res) => {
    try{
        const saltRounds = 10;

        bcrypt.hash(req.body.Password, saltRounds, async function(err, hash) {
            const newUser = new User({
                name:req.body.Name,
                username:req.body.Username,
                password:hash
            })
            await newUser.save();
            return res.status(200).json({msg:"Signup Successfull"});
        });
    }
    catch (error){
        return res.status(500).json({msg:"Error while signup"})
    }
}

export {signUpUser}
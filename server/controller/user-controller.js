import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Token from "../model/token.js";

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



const loginUser = async(req,res) =>{
    let user = await User.findOne({username: req.body.Username})
    if(user){
        try{    
            let match = await bcrypt.compare(req.body.Password, user.password) 
            
            if(match){
                    const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
                    const refreshToken =jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
                    
                    const newtoken = new Token({
                        token:refreshToken
                    })

                    await newtoken.save();

                    return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken,name:user.name,username:user.username})

            }
            else{
                        return res.status(400).json({ msg : 'Password Does Not Match'});
            }
        }
        catch(error){
            console.log("Error While Loggin In",error)
        }
    }

    else{
        return res.status(400).json({ msg : 'Username Does Not Match'});
    }
}

export {signUpUser,loginUser}
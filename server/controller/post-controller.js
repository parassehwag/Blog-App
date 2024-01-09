import post from "../model/post.js";
import Post from "../model/post.js";

const createPost = async(req,res) =>{
    try{
        const newPost = await new Post(req.body);
        newPost.save();
        return res.status(200).json({msg:'Post Saved Successfully'})
    }
    catch (error){
        return res.status(500).json({msg:'Error during post upload to database'})
    }
    
}

export default createPost;
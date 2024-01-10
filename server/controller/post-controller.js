import { request } from "express";
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

const getAllPosts = async(req,res) =>{
    try{
        let category = req.query.category;
        if(category){
            let posts = await Post.find({'categories': `${category}`});
            return res.status(200).json(posts);
        }
        else{
            let posts = await Post.find({});
            return res.status(200).json(posts);
        }
    }
    catch (error){
        return res.status(500).json({msg:error.message})
    }
}

const getPostById = async(req,res) =>{
    let id = req.query.id;
    try{
        let post = await Post.findOne({'_id': `${id}`});
            return res.status(200).json(post);
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

const updatePost = async(req,res) =>{
    try{
        const post = await Post.findOne({_id : req.body._id});
        if(!post){
            return res.status(404).json({msg:'post not found in db'})
        }
        await Post.updateOne({_id:req.body._id},{$set:req.body})

        return res.status(200).json({msg:'post updated'})
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

const deletePost = async(req,res)=>{
    try{
        const post = await Post.findOne({_id : req.query.id});
        if(!post){
            return res.status(404).json({msg:'post not found in db'})
        }
        await Post.deleteOne({_id:req.query.id})

        return res.status(200).json({msg:'post deleted'})
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

export default createPost;
export {getAllPosts,getPostById,updatePost,deletePost};
const express=require("express");
const { PostModel } = require("../models/postModel");
const { auth } = require("../middleware/authMiddleware");

const postRouter=express.Router();

postRouter.post("/add",auth,async(req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save();
        res.send({"msg":"new post has been added"})
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    try {
        const post=await PostModel.find({userID:req.body.userID})
        res.send(post);
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.userID!==post.userID){
            res.send({"msg":"you are not authorized"})
        }else{
            await PostModel.findAndUpdate({_id:postID},req.body)
            res.send({"msg":`Post with ${postID} has been updated.`})
        }
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})
    try {
        if(req.body.userID!==post.userID){
            res.send({"msg":"you are not authorized"})
        }else{
            await PostModel.findAndUpdate({_id:postID})
            res.send({"msg":`Post with ${postID} has been deleted.`})
        }
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    postRouter
}
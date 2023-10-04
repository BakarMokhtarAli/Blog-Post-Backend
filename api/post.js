import express from "express";
import prisma from "./lib/index.js"
import authenticate from "./middleware/authenticate.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    try {
        const post = await prisma.post.findMany();
        if(!post){
            return res.status(404).json({"message":"post not found"})
        }
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});
router.get("/:id", async(req,res)=>{
    
    try {
        const id = req.params.id
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });
        if(!post){
            return res.status(404).json({"message":`post ${id} not found`})
        }
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});

router.post("/", authenticate ,async(req,res)=>{
    try {
        const { ownerId, title, description } = req.body
        const post = await prisma.post.create({
            data:{
                ownerId,
                title,
                description
            }
        });
        if(!post){
            return res.status(404).json({"message":"post not created"})
        }
        return res.status(200).json({"message":"post created success",post})
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message}) 
    }
});

router.put("/:id",authenticate,async(req,res)=>{
    try {
        const { ownerId, title, description } = req.body
        const { id } = req.params;
        const post = await prisma.post.update({
            where:{
                id: Number(id)
            },
            data:{
                ownerId,
                title,
                description
            }
        });
        if(!post){
            return res.status(404).json({"message":"post not updated"})
        }
        return res.status(200).json({"message":"post updated success"})
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message}) 
    }
})

router.delete("/:id", authenticate, async(req,res)=>{
    try {
        const id = req.params.id
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });
        if(!post){
            return res.status(404).json({"message":`post ${id} not found`})
        }
        return res.status(200).json({"message":"post deleted success"})
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});

export default router

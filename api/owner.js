import express  from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authenticate from "./middleware/authenticate.js";
const SECRET_KEY= process.env.SECRET_KEY
const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const owner = await prisma.owner.findMany()
        if(!owner){
            res.status(404).json({"message":"owners not found"})
        }
        return res.status(200).json(owner)
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});
router.get("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const owner = await prisma.owner.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!owner){
            res.status(404).json({"message":`owner ${id} not found`})
        }
        return res.status(200).json(owner)
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});

router.post("/signup", async(req,res)=>{
    try {
        const { name, email, password } = req.body;
       var existingOwner = await prisma.owner.findUnique({
        where: {
            email: req.body.email
        }
       })
       if(existingOwner){
        return res.status(409).json({"message":"owner already exist"})
       }
       // hash the password
       const hashedPassword = await bcrypt.hash(password,10)
       const owner = await prisma.owner.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })
    if(!owner){
        return res.status(404).json({"message": "owner not created!"})
    }
        return res.status(200).json({"message":"owner created success!", owner})
    } catch (error) {
        
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});

router.post("/login", async (req,res)=>{
    try {
        const { email, password } = req.body;
        const existingOwner = await prisma.owner.findUnique({
            where:{
                email: email
            }
        });
        if(!existingOwner){
            return res.status(404).json({"message":"email is not exist"})
        }
        // check the password

        const isPasswrodCorrect = await bcrypt.compare(password,existingOwner.password)
        console.log(isPasswrodCorrect)
        if(!isPasswrodCorrect){
            return res.status(404).json({"message":"incorrect password"})
        }
        
        const token = jwt.sign(
            {id: existingOwner.id, name:existingOwner.name, email:existingOwner.email},
            SECRET_KEY,
            {expiresIn: "1h"}
        )
        
        return res.status(200).json({"message":"login success", token})
        
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
})

router.put("/:id", authenticate ,async(req,res)=>{
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const owner = await prisma.owner.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                password
            }
        });
        if(!owner){
            return res.status(404).json({"message": "can not update owner"})
        }
        return res.status(200).json({"message":"owner updated success"})
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
});

router.delete("/:id",authenticate,async(req,res)=>{
    try {
        const { id } = req.params
        const owner = await prisma.owner.delete({
            where:{
                id:Number(id)
            }
        });
        if(!owner){
            res.status(404).json({"message":"owner could not be deleted"})
        }
        return res.status(201).json({"message":"owner deleted success"})
    } catch (error) {
        return res.status(500).json({"message": "some thing went wrong", "error": error.message})
    }
})

export default router

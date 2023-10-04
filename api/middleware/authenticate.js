import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req,res,next){
    const token = req.headers.authorization
    if(!token){
        return res.status(404).json({"message":"authentication failed missing token"})
    }

    const tokenWithOutBearer = token.split(" ")[1];
    jwt.verify(tokenWithOutBearer,SECRET_KEY, (error,decoded)=>{
        if(error){
            return res.status(404).json({"message":"invalid token"})
        }
        req.decoded = decoded;
        next()
    })
}

export default authenticate
import express from "express"
import OwnersRoute from "./owner.js"
import postRoutes from "./post.js"
const server = express();

server.use(express.json());

server.use("/api/owner",OwnersRoute);
server.use("/api/post", postRoutes)

export default server
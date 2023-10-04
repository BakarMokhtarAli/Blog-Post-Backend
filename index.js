import server from "./api/server.js"

const PORT = 9000;

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
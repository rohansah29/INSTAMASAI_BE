const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoute");
const { postRouter } = require("./routes/postRoute");
const cors=require("cors")

const app=express();
app.use(express.json())
app.use(cors());

app.use("/users",userRouter)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB")
       console.log("Server is running at port 8080"); 
    } catch (error) {
        console.log(error)
    }
})
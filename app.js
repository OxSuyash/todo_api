import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMidleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
    path: "./data/config.env",
})

//using midlleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],  // requests are allowed only from this url
    methods: ["GET", "POST", "PUT", "DELETE"], //only these methods are allowed from above url
    credentials: true // to access cookie on frontend

}))

//using router
app.use("/api/v1/users", userRouter)
app.use("/api/v1/task", taskRouter)


app.get("/", (req,res)=>{
    res.end("Nice working")
})

//using error middleware
app.use(errorMidleware)

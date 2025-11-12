
import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { productRouter } from "./app/modules/products/product.router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { userRouter } from "./app/modules/users/user.router";




export const app = express()

app.use(cors({
    origin: ['http://localhost:3000',"https://abdurrahmandev-phi.vercel.app"],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser()); 

app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)

// Default route testing

app.get('/',(req:Request, res:Response)=>{
    res.send("Abdur Rahman Server is running")
})


app.use(globalErrorHandler)
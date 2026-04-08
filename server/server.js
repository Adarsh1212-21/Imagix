import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import imageRouter from './routes/imageRoutes.js'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
console.log("MONGO URI:", process.env.MONGODB_URI) 

const PORT=process.env.PORT||4000

const app=express()

app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/image', imageRouter)

app.use('/api/user',userRouter)
app.get('/',(req,res)=>res.send("API working"))

app.listen(PORT,()=>console.log('Server Running on '+PORT))
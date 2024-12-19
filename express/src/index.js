import express from 'express'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'
import dbConnect from './db/dbConnect.js'


const app = express()

app.use((req, res, next)=>{
    console.log(`Method ${req.method}, URL: ${req.url} `)
    next()
})

app.use(express.json())

app.use('/user', userRouter)
app.use('/note', noteRouter)


const start = async () => {
    try {
        await dbConnect(process.env.MONGO_URL)
        app.listen(process.env.PORT, () =>{
            console.log(`Server started on http://localhost:${process.env.PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()
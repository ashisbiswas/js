import express from 'express'
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'
import dbConnect from './db/dbConnect.js'


const app = express()

app.use(express.json())

app.use('/user', userRouter)
app.use('/note', noteRouter)


const start = async () => {
    try {
        await dbConnect()
        app.listen(4000, () =>{
            console.log(`Server started on http://localhost:4000`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()
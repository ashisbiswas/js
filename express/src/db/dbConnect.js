import mongoose from 'mongoose'

const dbConnect = (url) => {
    mongoose.connect(url)
} 

export default dbConnect
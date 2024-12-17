import mongoose from 'mongoose'

const dbConnect = () => {
    mongoose.connect('mongodb+srv://ashismongo:FOLifZhjJ87U5CID@cluster0.wuodd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
} 

export default dbConnect
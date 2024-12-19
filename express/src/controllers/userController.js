import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userController = {
    signup: async (req, res)=> {

        const {username, password, email} = req.body

        try {
            const existingUser = await userModel.findOne({ email: email})
            if(existingUser){
                return res.status(400).json({ message: "User already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const result = await userModel.create({
                email: email,
                password: hashedPassword,
                username: username
            })

            const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY)
            res.status(201).json({user: result, token: token})

        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message})
        }

    },
    signin: async (req, res) => {

        const { email, password } = req.body

        try{
            const existingUser = await userModel.findOne({ email: email})

            if(!existingUser) {
                return res.status(404).json({ message: "User does not exist "})
            }

            const matchedPassword = await bcrypt.compare(password, existingUser.password)

            if(!matchedPassword){
                return res.status(400).json({ message: "Invalid credentials" })
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRECT_KEY)
            res.status(200).json({user: existingUser, token: token})

        }catch(err){
            console.log(err)
            res.status(500).json({message: err.message})
        }
    }
}

export default userController
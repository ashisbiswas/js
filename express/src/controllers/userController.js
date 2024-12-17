import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userController = {
    SECRECT_KEY: 'ashisbiswas',
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

            const token = jwt.sign({ email: result.email, id: result._id }, userController.SECRECT_KEY)
            res.status(201).json({user: result, token: token})

        } catch (err) {
            console.log(err)
            res.status(500).json({message: err.message})
        }

    },
    signin: function(req, res){

    }
}

export default userController
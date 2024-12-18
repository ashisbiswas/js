import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    try {
        
        let token = req.headers.authorization

        if( token ){
            
            token =  token.split(' ')[1]
            let user = jwt.verify( token, 'ashisbiswas')
            req.userId = user.id

        }else{
            res.status(401).json({ message: 'Unauthorized User'})
        }

        next()

    } catch (error) {
        res.status(401).json({ message: "Error : " + error.message, token: req.headers.authorization})
    }
}

export default auth
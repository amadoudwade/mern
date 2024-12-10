//import model user
import { User } from "../Models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//ajout user
export const AddUser = async (req, res, next) => {
    //verifier si email not exist
    try {
        const { email, first_name, last_name, password, role } = req.body


        const isExistUser = await User.findOne({
            email: email
        })

        if (isExistUser) {
            return res.status(400).json({ msg: "Cet User Exist!!" })
        }
        //ajout user 
        const hashpassword = await bcrypt.hash(password, 10)

        await new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashpassword,
            role: role,
            // avatar: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

        }).save()
        res.status(201).json({ msg: "User Ajouté!!" })


    } catch (error) {
        console.log(error);

        return res.send({ error })
    }

}

//login user
export const login = async (req, res, next) => {
    //recuperartion mail&password
    const { email, password } = req.body



    try {
        //verifier si user exist
        const isExistUser = await User.findOne({
            email: email
        })

        if (!isExistUser) {
            return res.status(400).json({ msg: "email incorrect!!!" })
        }


        //verifier le password
        const isMatching = await bcrypt.compare(password, isExistUser.password)

        if (!isMatching) {
            return res.status(400).json({ msg: "Password incorrect!!!" })

        }

        // generer un token et connecter user
        const payload = {

            userid: isExistUser._id,
            userrole: isExistUser.role

        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ token })

    } catch (error) {
        return res.status(500).json(error)
    }



}

//verify token

export const verifyToken = async (req, res, next) => {


    //si exist et valide next sinon "return pas info incorect"
    try {
        //recuperer le token    
        const { token } = req.params 

        //si token exist pas
        if (!token) {
            res.status(401).json({ msg: "Non autorisée!!" })

        }
        const decodetoken = jwt.verify(token, process.env.SECRET_KEY
        )    

        const user = await User.findOne({
            _id: decodetoken.userid
        })

        if (!user) {
            res.status(404).json({ msg: "User inexistant !!" })
        }

        const UserInfo = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }

        res.status(200).json(UserInfo)

    } catch (error) {
        console.log(error);

        res.status(400).json({ msg: "Login/password incorrect!!" })
    }
}
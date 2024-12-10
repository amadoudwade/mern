import jwt from "jsonwebtoken";

export const auth = (req, res, next) =>{
    //recuperer le token    
    
    const token = req.headers.authorization
    //si token exist pas
    if (!token) {
        res.status(401).json({msg: "Non autorisée!!"})
        
    }

    //si exist et valide next sinon "return pas info incorect"
    try {
        const decodetoken = jwt.verify(token, process.env.SECRET_KEY)
        req.auth = {
            userId: decodetoken.userid,
            userRole: decodetoken.userrole
        }
        
        
        
        next()
      
    } catch (error) {
        res.status(400).json({msg: "Login/password incorrect!!"})
    }
    
}
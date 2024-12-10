
// prend en param le role pour acceder à la route 

export const authorize = (role) => {
    return [
        (req, res, next) => {
            // si role dans la requete match avec celle du param === pass
              // sinon renvoyer Acces refudé
              if (req.auth.userRole != role) {
                return res.status(403).json({msg: "Acces refusé!!"})
              }
              next()
            
        }
    ]
    
    
}
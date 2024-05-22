import jwt from 'jsonwebtoken';
import JWT_SECRET from "./config.js";

function authMiddleware(req, res, next){
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith('Bearer ')){
        res.status(403).json({})
    }
    const token = authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET,(err, authData)=>{
        if(err){
            res.status(403).json({})
        }
        else{
            req.userId = authData.userId;
            next();
        }
    })

}

export {authMiddleware};
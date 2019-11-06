const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/keys')
module.exports = (req,res,next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({errors: "No token, Authorization denied"})
    }

    try {
        const decoded = jwt.verify(token,jwtSecret)
        req.user = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({errors: "InValid token"})
    }
    
}
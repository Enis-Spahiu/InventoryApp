const jwt = require('jsonwebtoken');
const SK = process.env.ACCESS_SECRET_KEY

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith("Bearer ")){ return res.status(401).json({message: "Auth Problem!"})}

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SK, 
        (err, decoded) => {
            if (err){ return res.status(403).json({message: "Auth verification Problem!", error: err})}
            req.email = decoded.email;
            next();
        });
}
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){

    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = bearerToken || req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Incorrect Authorization or Login Again"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(decoded);

        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports = authMiddleware

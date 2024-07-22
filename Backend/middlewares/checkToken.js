const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkToken = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({
            msg: "Token necessário."
        });
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.status(400).json({
                msg: "Acesso negado."
            })
        }
        next();
    });

}

module.exports = checkToken;
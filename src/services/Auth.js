const JWT = require('jsonwebtoken');
const JWT_CRED = require('../dev.json');

exports.verfifyJWT = async (req, res, next) => {
    let token = req.headers['authorization'];
    return await checkJWT(token).then((valid) => {
        if(!valid){
            res.send([{
                code: 100,
                status: "ERROR",
                message: "Authorization is compulsory for this request. Token is not received within the request. Please add valid token."
            }]);
        } else {
            token = token.replace('Bearer ', '');
            try {
                JWT.verify(token, JWT_CRED.ACCESS_TOKEN_SECRET);
                next();
            } catch(error) {
                res.send([{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }]);
            }
        }
    }).catch((error) => {
        res.send([{
            code: 100,
            status: "ERROR",
            message: error.message
        }]);
    });
}

checkJWT = async (token) => {
    if(token == undefined || token == "") {
        return false;
    }
    return true;
}
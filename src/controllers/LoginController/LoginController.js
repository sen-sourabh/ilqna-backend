const loginServices = require("../../services/LoginServices");

exports.login = async (req, res, next) => {
    const result = await loginServices.login(req.body);
    res.send(result);
};
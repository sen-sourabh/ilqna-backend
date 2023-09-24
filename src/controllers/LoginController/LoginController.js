const loginServices = require('../../services/LoginServices');

exports.login = async (req, res, next) => {
  const result = await loginServices.login(req, req.body);
  res.send(result);
};

exports.forgotPassword = async (req, res, next) => {
  const result = await loginServices.forgotPassword(req.body);
  res.send(result);
};

exports.resetPassword = async (req, res, next) => {
  const result = await loginServices.resetPassword(req.body);
  res.send(result);
};

exports.changePassword = async (req, res, next) => {
  const result = await loginServices.changePassword(req.body);
  res.send(result);
};

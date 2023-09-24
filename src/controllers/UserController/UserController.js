const userServices = require('../../services/UserServices');

exports.getAllUsers = async (req, res, next) => {
  const result = await userServices.getAllUsers(req);
  res.send(result);
};

exports.addUser = async (req, res, next) => {
  const result = await userServices.addUser(req.body);
  res.send(result);
};

exports.updateUser = async (req, res, next) => {
  const result = await userServices.updateUser(req.body._id, req.body);
  res.send(result);
};

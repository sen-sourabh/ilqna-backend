const categoryServices = require('../../services/CategoryServices');

exports.getAllCategories = async (req, res, next) => {
  const result = await categoryServices.getAllCategories();
  res.send(result);
};

exports.addCategory = async (req, res, next) => {
  const result = await categoryServices.addCategory(req.body);
  res.send(result);
};

exports.updateCategory = async (req, res, next) => {
  const result = await categoryServices.updateCategory(req.body._id, req.body);
  res.send(result);
};

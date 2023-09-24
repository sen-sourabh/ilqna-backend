const languageServices = require('../../services/LanguageServices');

exports.getAllLanguages = async (req, res, next) => {
  const result = await languageServices.getAllLanguages();
  res.send(result);
};

exports.addLanguage = async (req, res, next) => {
  const result = await languageServices.addLanguage(req.body);
  res.send(result);
};

exports.updateLanguage = async (req, res, next) => {
  const result = await languageServices.updateLanguage(req.body._id, req.body);
  res.send(result);
};

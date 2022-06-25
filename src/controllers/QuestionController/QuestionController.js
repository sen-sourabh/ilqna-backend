const questionServices = require("../../services/QuestionServices");

exports.getAllQuestions = async (req, res, next) => {
    const result = await questionServices.getAllQuestions();
    res.send(result);
};

exports.addQuestion = async (req, res, next) => {
    const result = await questionServices.addQuestion(req.body);
    res.send(result);
};

exports.updateQuestion = async (req, res, next) => {
    const result = await questionServices.updateQuestion(req.body._id,req.body);
    res.send(result);
};
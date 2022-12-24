const answerServices = require("../../services/AnswerServices");

exports.getAllAnswers = async (req, res, next) => {
    const result = await answerServices.getAllAnswers(req.body);
    res.send(result);
};

exports.getAllAnswersCountOfUser = async (req, res, next) => {
    const result = await answerServices.getAllAnswersCountOfUser(req.body);
    res.send(result);
};

exports.addAnswer = async (req, res, next) => {
    const result = await answerServices.addAnswer(req.body);
    res.send(result);
};

exports.updateAnswer = async (req, res, next) => {
    const result = await answerServices.updateAnswer(req.body._id,req.body);
    res.send(result);
};
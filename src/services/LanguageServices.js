const Languages = require("../models/Languages/Languages");

exports.getAllLanguages = async () => {
    return await Languages.find({ deleted: false });
};

exports.addLanguage = async (newLanguage) => {
    const language = await Languages.find({ languageName: newLanguage.languageName });
    if(language.length === 0) {
        return await new Languages(newLanguage).save()
            .then((response) => {
                if(response._id) {
                    let res = [{
                        code: 200,
                        status: "OK",
                        message: "Language added successfully.",
                        data: response
                    }];
                    return res;
                }
            }).catch((error) => {
                let res = [{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }];
                return res;
            });
    } else {
        return [{
            code: 300,
            status: "OK",
            message: "Language already exist."
        }];
    }
};

exports.updateLanguage = async (_id, body) => {
    const language = await Languages.find({ languageName: body.languageName });
    if(language.length === 0) {
        return await Languages.findByIdAndUpdate(_id, body)
            .then(async (response) => {
                let res;
                if(response._id) {
                    return await Languages.findById({ _id: response._id }).then((result) => {
                        res = [{
                            code: 200,
                            status: "OK",
                            message: "Language updated successfully.",
                            data: result
                        }];
                        return res;
                    }).catch((error) => {
                        res = [{
                            code: 100,
                            status: "ERROR",
                            message: error.message
                        }];
                        return res;
                    });
                }
            }).catch((error) => {
                let res = [{
                    code: 100,
                    status: "ERROR",
                    message: error.message
                }];
                return res;
            });
    } else {
        return [{
            code: 300,
            status: "OK",
            message: "Language already exist."
        }];
    }
};
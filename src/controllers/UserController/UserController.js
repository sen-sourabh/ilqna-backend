const Users = require("../../models/Users/Users")

exports.getAllUsers = async (req, res, next) => {
    await Users.find().then((response) => {
        res.send(response)
    }).catch((error) => {
        console.log(error)
    });
};

exports.addUser = async (req, res, next) => {
    let user = req.body;
    const newUser = new Users(user)
    const addedUser = await newUser.save()
                        .then((response) => { res.send(response) })
                        .catch((error) => { res.status(400).send(error.message) });
};
const { mongoose } = require("mongoose")

exports.connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/ilqna_dev_11_06_2022", {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => {
        console.log("MongoDb Connected!")
    }).catch((err) => {
        console.log(err)
    });
};

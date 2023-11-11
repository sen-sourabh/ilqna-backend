const { mongoose } = require('mongoose');
const { MONGO_URI } = require('../../dev.json');

exports.connectDB = async () => {
  await mongoose
    .connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => {
      console.log('MongoDb Connected!');
    })
    .catch((err) => {
      console.log(err);
    });
};

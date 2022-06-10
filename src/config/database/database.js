const { mongoose } = require("mongoose")
mongoose.connect("mongodb://localhost:27017/ilqna_dev_11_06_2022", (err) => {
    if(err) 
        console.log("Error from Database connectivity: ", err)
    else 
        console.log("MongoDb Connected.");
})


module.exports = mongoose

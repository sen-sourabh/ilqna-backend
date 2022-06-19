const express = require("express")
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const { connectDB } = require('./config/database/database');
connectDB();

//import Routes
const userRouters = require("./routers/users")
const questionRouters = require("./routers/questions")
const categoryRouters = require("./routers/categories")

//declared Routes
app.use("/users", userRouters)
app.use("/questions", questionRouters)
app.use("/categories", categoryRouters)


app.listen(3000, () => {
    console.log("Server is listening at port 3000...")
});
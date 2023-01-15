const express = require("express")
const app = express();
let cors = require('cors');
// var corsOptions = {
//   origin: 'http://localhost:3001',
//   optionsSuccessStatus: 200
// }
const bodyParser = require("body-parser");
const { connectDB } = require('./config/database/database');

app.use(bodyParser.json());
app.use(cors());
connectDB();

//import Routes
const loginRouters = require("./routers/login")
const userRouters = require("./routers/users")
const questionRouters = require("./routers/questions")
const answerRouters = require("./routers/answers")
const categoryRouters = require("./routers/categories")
const languageRouters = require("./routers/languages")

//declared Routes 
app.use("/ilqna/auth", loginRouters)
app.use("/ilqna/users", userRouters)
app.use("/ilqna/questions", questionRouters)
app.use("/ilqna/answers", answerRouters)
app.use("/ilqna/categories", categoryRouters)
app.use("/ilqna/languages", languageRouters)


app.listen(3001, () => {
    console.log("Server is listening at port 3001...")
});
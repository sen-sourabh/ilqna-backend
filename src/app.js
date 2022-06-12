'use strict';
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const { connectDB } = require('./config/database/database');
connectDB();

//import Routes
const userRouters = require("./routers/users")

//declared Routes
app.use("/users", userRouters)


app.listen(3000, () => {
    console.log("Server is listening at port 3000...")
});
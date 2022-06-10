const express = require("express")
const bodyParser = require("body-parser")
const { mongoose } = require("./config/database/database")

const app = express();
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log("Server is listening at port 3000...")
})
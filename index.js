const express = require("express")
const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config();

const app = express()

//DB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected")
}).catch(err => console.log(err))


app.listen(8800, () => {
    console.log("Backend server is running");
})
const express = require("express")
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
const cors = require('cors')

dotenv.config();

const app = express()

const corsOptions = {
    origin: 'https://netflix-mern-2022.herokuapp.com/api/',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

//DB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected")
}).catch(err => console.log(err))

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)



app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running");
})
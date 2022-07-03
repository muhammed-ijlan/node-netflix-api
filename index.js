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
    origin: 'http://localhost:4000/',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

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
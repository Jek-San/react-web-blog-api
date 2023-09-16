const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose");
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

//import Route from route
const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")

dotenv.config();
const corsOpt = {
  origin: ['http://localhost:3000', 'http://localhost:8800'],

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

//Middleware

const app = express()
app.use(express.json());
app.unsubscribe(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(morgan("common"))


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8800, () => {
      console.log("Backend server is running!!!")
    })
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error)
  })




app.get("/api/test", (req, res) => {
  res.send("Oke")
})


app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
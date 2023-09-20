const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose");
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")
const path = require("path")

//import Route from route
const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")
const postsRoute = require("./routes/post.js")
const categoriesRoute = require("./routes/categories.js")

dotenv.config();
const corsOpt = {
  origin: ['http://localhost:3000', 'http://localhost:8800'],

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

//Middleware

const app = express()
app.use(cors(corsOpt))
app.use(express.json());

app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(morgan("common"))
app.use("/images", express.static(path.join(__dirname, "/images")))


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





//storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  }, filename: (req, file, cb) => {

    const nameFile = req.body.name;
    cb(null, nameFile);
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded ")
})

app.get("/api/test", (req, res) => {
  res.send("Oke")
})


app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/categories", categoriesRoute)
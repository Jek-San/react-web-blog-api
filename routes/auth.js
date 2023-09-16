const router = require("express").Router();
const User = require("../models/User.js")
const bcrypt = require("bcrypt")

//REGISTER
router.post("/register", async (req, res) => {
  console.log("register api on call")
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })



    //save user and return response
    const user = await newUser.save()
    res.status(200).json(user)


  } catch (err) {
    res.status(500).json(err)
  }
})

//LOGIN

router.post("/login", async (req, res) => {
  console.log("login api in call")

  try {
    //Find User from MongoDb
    const user = await User.findOne({
      $or: [
        { email: req.body.usernameOrEmail },
        { username: req.body.usernameOrEmail }

      ]
    })

    //Check User is found or not
    if (!user) {
      return res.status(404).send("User not Found!")
    }

    //Check ValidPassword
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json("Wrong pssword")
    }

    //Send Respond User
    const { password, ...others } = user._doc
    res.status(200).json(others)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

})



module.exports = router


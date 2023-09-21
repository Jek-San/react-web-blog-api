const router = require("express").Router();
const User = require("../models/User.js")
const Post = require("../models/Post.js")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
//Update User by Id

router.put("/:id", async (req, res) => {
  console.log("user update on call")
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      //Check ValidPassword
      // const validPassword = await bcrypt.compare(req.body.password, user.password)

      // if (!validPassword) {
      //   return res.status(400).json("Wrong pssword")
      // }

      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)

    }
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true })
      const user = await User.findById(req.body.userId)

      const { password, ...others } = user._doc
      console.log(others)
      res.status(200).json(others)
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  } else {
    res.status(401).json("Your can update only your account")
  }

})


//DELETE USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {

    try {
      //CHECK ID IS VALID FORMAT
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid user ID");
      }

      //FIND USER AND IF THER NO USER
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json("User not found");
      }

      //DELETE POST WHERE HAD USERNAME SAME AS USER
      await Post.deleteMany({ username: user.username })
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted")
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  } else {
    res.status(200).json("You only can delete ur account")
  }
})

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
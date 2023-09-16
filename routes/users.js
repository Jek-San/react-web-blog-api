const router = require("express").Router();
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
//Update User by Id

router.put("/:id", async (req, res) => {
  console.log("user update on call")
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)

    }
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      })

      res.status(200).json(updateUser)
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  } else {
    res.status(401).json("Your can update only your account")
  }

})

module.exports = router
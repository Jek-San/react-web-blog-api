const router = require("express").Router();
const User = require("../models/User.js")
const Category = require("../models/Category.js")

//Create Category
router.post("/", async (req, res) => {
  const newCat = new Category(req.body)

  try {
    const savedCategory = await newCat.save()
    res.status(200).json(savedCategory)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//Get all category
router.get("/", async (req, res) => {

  try {
    const cats = await Category.find()
    res.status(200).json(cats)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
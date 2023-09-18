const router = require("express").Router();
const User = require("../models/User.js")
const Post = require("../models/Post.js")


//CREATE POST

router.post("/", async (req, res) => {
  console.log("post create in create")
  const newPost = new Post(req.body)
  console.log("req body:", req.body)
  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost)

  } catch (err) {
    res.status(500).json(err)
  }

})

//UPDATE POST
router.put('/:id', async (req, res) => {
  console.log("Update post on call")
  try {
    const post = await Post.findById(req.params.id)
    if (req.body.username === post.username) {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true })
      const savedPost = await updatedPost.save();
      res.status(200).json(savedPost)
    }
    else {
      res.status(402).json("You Only Can Update your post")
    }
  } catch (err) {
    res.status(500).json(err)
  }

})

//DELETE POST
router.delete('/:id', async (req, res) => {
  console.log("Delete post on call")
  try {
    const post = await Post.findById(req.params.id)
    if (req.body.username === post.username) {
      await post.delete()
      res.status(200).json("Your post has been deletes")
    }
    else {
      res.status(402).json("You Only Can Delete your post")
    }
  } catch (err) {
    res.status(500).json(err)
  }

})

//GET POST 
router.get("/:id", async (req, res) => {
  console.log("Get post in call")
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

//GET ALL POST
router.get("/", async (req, res) => {
  console.log("Get post in call")
  const username = req.query.user;
  const catName = req.query.cat;


  try {
    let posts;
    if (username) {
      posts = await Post.find({
        username: username
      })
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName]
        }
      })
    } else {
      posts = await Post.find()
    }

    res.status(200).json(posts)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
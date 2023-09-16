const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,

    },
    photo: {
      typer: String,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("PostWebBlog", PostSchema)
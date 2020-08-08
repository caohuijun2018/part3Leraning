const mongoose = require('mongoose')
const { response } = require('express')
const url = `mongodb://localhost:27017/test`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
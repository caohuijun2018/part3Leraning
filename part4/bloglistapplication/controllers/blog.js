const blogRouter = require('express').Router()
const Blog = require('../mongo')


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
          console.log("blogs:",blogs)
        response.json(blogs)
      })
  })
blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

  module.exports = blogRouter
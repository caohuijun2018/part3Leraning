const blogRouter = require('express').Router()
const Blog = require('../mongo')
const { request } = require('express')
const { response } = require('../app')
const { repeat } = require('lodash')


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
          console.log("blogs:",blogs)
        response.json(blogs)
      })
  })
// blogRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)
  
//   blog
  
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
blogRouter.post('/', async (request,response) => {
  const blog = new Blog(request.body)
  const use  = blog.toObject()
  let exits1 = use.hasOwnProperty('title')
  let exits2 = use.hasOwnProperty('url')
  if(exits1 === true && exits2 === true){
    blog
  
    .save()
    .then(result => {
      console.log(result)
      response.status(201).json(result)
    })
  }else {
    response.status(400).end()
  }
})
blogRouter.delete('/:id', async(request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).end()
})
blogRouter.get('/:id', async(request,response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else {
    response.status(404).end()
  }
})
 blogRouter.put('/:id', async(request,response) => {
   const body = request.body
   const blog = {
     title : body.title,
     author : body.author,
     url: body.url,
     likes: body.likes
    
   }
   const updateBlog = await Blog.findByIdAndUpdate(request.params.id,blog) 
   response.json(updateBlog)
 })


  module.exports = blogRouter
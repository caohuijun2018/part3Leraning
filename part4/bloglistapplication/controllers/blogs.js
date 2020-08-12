const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { request } = require('express')
const { response } = require('../app')
const { repeat } = require('lodash')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogRouter.get('/', async (request, response) => {

  const newBlogs = await Blog.find({}).populate('user')
  response.json(newBlogs)
  console.log(newBlogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     //console.log("blogs:", blogs)
  //     response.json(blogs)
  //   })
})
// blogRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog

//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
blogRouter.post('/', async (request, response) => {
  const body = request.body
  // const user =await User.findById(body.userId)
  //console.log(user)

  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json(error)
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log("decodeToken:" , decodedToken)
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  //const blog = new Blog(request.body)
  const use = blog.toObject()

  console.log("use:", use)
  let exits1 = use.hasOwnProperty('title')
  let exits2 = use.hasOwnProperty('url')
  if (exits1 === true && exits2 === true) {

    const saveBlog = await blog.save()
    console.log("blog:", user.blogs)
    user.blogs = user.blogs.concat(saveBlog._id)
    await user.save()
    response.status(201).json(saveBlog)
    // blog

    // .save()
    // .then(result => {
    //   console.log(result)
    //   response.status(201).json(result)
    //})
  } else {
    response.status(400).json({ error: 'title and url is necessary' })
  }
})

blogRouter.get('/:id' ,async (request,response) => {
  const body = request.body
  console.log('username:',body.username)
  return body.username
})


blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).end()
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
blogRouter.put('/:id', async (request, response) => {   //更新
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes

  }
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updateBlog)
})


module.exports = blogRouter
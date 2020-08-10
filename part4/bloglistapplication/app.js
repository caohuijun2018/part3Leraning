//const express= require('express')

const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRounter = require('./controllers/login')
const { mongo } = require('mongoose')
const { request } = require('express')

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRounter)

module.exports = app
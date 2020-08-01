const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const noteRouter = require('./controllers/notes')
const { request, response } = require('express')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const url  = 'mongodb://localhost:27017/test'
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
logger.info('connecting to', config.PORT)

app.use('/api/notes', noteRouter)


app.use(middleware.unknownEndpoint)


app.use(middleware.errorHandler)


module.express = app
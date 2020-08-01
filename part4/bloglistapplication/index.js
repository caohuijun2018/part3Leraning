const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
const mongoUrl = 'mongodb://localhost:27017/test'
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


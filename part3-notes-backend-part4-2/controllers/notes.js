const notesRouter = require('express').Router()
const Note = require('../models/note')
const { request } = require('../app')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')
notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user')
  // const notes = await Note.find({})
  response.json(notes)
})
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes.map(note => note.toJSON()))
//   })
// })

notesRouter.get('/:id', async (request, response, next) => {
  // try{
  //  const note = await Note.findById(request.params.id)
  //  if(note){
  //    response.json(note)
  //  }else {
  //    response.status(404).end()
  //  }
  // }catch(exception)  {
  //     next(exception)
  // }

  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note.toJSON())
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  //const user = await User.findById(body.userId)
  const token = getTokenFrom(request)
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1ZjJlMmM4YmUyNDliNDJlMThiZjU1MzMiLCJpYXQiOjE1OTY4NjI1MDZ9.pCy-SpGnKD6omX-HYH-pzxsROYyg-ntOL8caWDtOg40'
  console.log("token:",token)
  

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
  }catch(error){
    return response.status(401).json(error)
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log("decodedToken:",decodedToken)
  console.log('deId:',decodedToken.id)
   if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if(user === null){
    return response.status(404).json({error: 'user does not exist'})
  }
  console.log("user:",user)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })
  console.log("note:",note)
  // try{const savedNote = await note.save()
  //   response.json(savedNote)
  // }catch(response){
  //   next(response)
  //}
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.json(savedNote)






  //   note.save()
  //     .then(savedNote => {
  //       response.json(savedNote.toJSON())
  //     })
  //     .catch(error => next(error))
  // })
})
notesRouter.delete('/:id', async (request, response, next) => {
  // try {
  //   await Note.findByIdAndRemove(request.params.id)
  //   response.status(204).end()
  // } catch (exception) {
  //   next(exception)
  // }

  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
// Note.findByIdAndRemove(request.params.id)
//   .then(() => {
//     response.status(204).end()
//   })
//   .catch(error => next(error))


notesRouter.put('/:id', async (request, response) => { //更新
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote.toJSON())
  //   })
  //   .catch(error => next(error))
})

module.exports = notesRouter
const notesRouter = require('express').Router()
const Note = require('../models/note')
const { request } = require('../app')
const { response } = require('express')
require('express-async-errors')
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})
// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes.map(note => note.toJSON()))
//   })
// })

notesRouter.get('/:id', async(request, response, next) => {
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
   if(note){
     response.json(note)
   }else {
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

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  // try{const savedNote = await note.save()
  //   response.json(savedNote)
  // }catch(response){
  //   next(response)
  //}
  const savedNote = await note.save()
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
  

  notesRouter.put('/:id', async(request, response, next) => {
    const body = request.body

    const note = {
      content: body.content,
      important: body.important,
    }
    const updatedNote =await Note.findByIdAndUpdate(request.params.id,note,{new: true})
    response.json(updatedNote)
    // Note.findByIdAndUpdate(request.params.id, note, { new: true })
    //   .then(updatedNote => {
    //     response.json(updatedNote.toJSON())
    //   })
    //   .catch(error => next(error))
  })

  module.exports = notesRouter
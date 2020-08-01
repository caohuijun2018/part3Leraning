const noteRouter  = require('express').Router()

const Note = require('../models/note')
noteRouter.get('/', (request, response) => {  //后端从数据库获取数据
    Note.find({}).then(notes => {
      response.json(notes.map(note => note.toJSON()))
    })
  })
  noteRouter.post('/', (request, response, next) => { //添加新的便签
    const body = request.body
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save()
      .then(savedNote => savedNote.toJSON())
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      }) 
      .catch(error => next(error))
  })
  noteRouter.get('/:id', (request, response, next) => { //获取指定id的便签
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note.toJSON())
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  noteRouter.delete('/:id', (request, response, next) => { //删除指定id的便签
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  noteRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })
  
module.exports = noteRouter 
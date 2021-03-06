const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')
const notesRouter = require('../controllers/notes')

// const initialNotes = [
//     {
//         content: 'HTML is easy',
//         important: false,
//     },
//     {
//         content: 'Browser can execute only Javascript',
//         important: true,
//     },
// ]

beforeEach(async () => {
    await Note.deleteMany({})

    // const noteObjects = helper.initialNotes
    //  .map(note => new Note(note))
    //  const promiseArray = noteObjects.map(note => note.save())
    //  await promiseArray.all(promiseArray)


    for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }
    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()

    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})
test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('there are four notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})
test('the first note is about Http methods', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
        'Browser can execute only Javascript'
    )
})
test('a valid note can be added', async () => {
    const newNote = {
        content: 'Single Page Apps use token authoer',
        important: true
    }
    const newLogin = {

        username: "mluukkai",
        password: "salainen"
    }
    const loginaa = await api
        .post('/api/login')
        .send(newLogin)
    console.log("login:", loginaa.body)
    const hasToken = loginaa.body.token
    //console.log("token:",hasToken)
    await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', 'bearer ' + hasToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    // const response = await api.get('/api/notes')
    // const contents = response.body.map(r => r.content)

    // expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain('Single Page Apps use token authoer')
})
test('note without content is not added', async () => {
    const newNote = {
        impotant: true
    }
    const newLogin = {

        username: "mluukkai",
        password: "salainen"
    }
    const loginaa = await api
        .post('/api/login')
        .send(newLogin)
    console.log("login:", loginaa.body)
    const hasToken = loginaa.body.token
    await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', 'bearer ' + hasToken)
        .expect(400)
    const notesAtEnd = await helper.notesInDb()
    //const response = await api.get('/api/notes')
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToview = notesAtStart[0]

    const resuleNote = await api
        .get(`/api/notes/${noteToview.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resuleNote.body).toEqual(noteToview)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
})
afterAll(() => {
    mongoose.connection.close()
})
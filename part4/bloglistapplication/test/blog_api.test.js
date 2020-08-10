const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { response } = require('express')
const User = require('../models/user')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('the number of blogs', async() => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(5)
  })
//   test('the like is necessary',async() => {
//       const response = await api.get('/api/blogs')
//       const Isexits = response.
//       const exits = response.hasOwnProperty('likes')
//     if(exits === false) {

//     }
//   })
test ('Attributes test', async() => {
    const newBlog = {
        id: 12,
        author:'hello'
    }
    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)
})


test('Invalid user name', async() => {

  const newUser = {
    username: 'aa',
    name: 'jun',
    password:'hahaha'
  }
  const result =   await api
  .post('/api/users')
  .send(newUser)
  .expect(400)

})
  
  afterAll(() => {
    mongoose.connection.close()
  })
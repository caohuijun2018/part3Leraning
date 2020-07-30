const http = require('http')

const express = require('express')
const { response, request } = require('express')
const app = express()
const morgan = express('morgan')
const Person = require('./models/person.js')




//const Person = mongoose.model('Person', personSchema)


const cors = require('cors')
const e = require('express')
const { update } = require('./models/person.js')
app.use(cors())
app.use(express.json())


// let persons = [
//     {
//         name: "Arto Hellas",
//         number: "034-123456",
//         id: 1
//     },
//     {
//         name: "Ada Lovelac",
//         number: "39-44-5325525",
//         id: 2
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234325",
//         id: 3
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 4
//     }
// ]
// app.get('/api/persons',(request,response) => {
//     //console.log(Person.find( person => person.id === 1))
//     Person.find({}).then( persons => {
//         response.json(persons)
//     })
// })

app.get('/api/persons', (request, response) => { //从数据库获取初始数据
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


app.get('/info', (request, response) => {
    let numberPersons = Person.length;

    let time = new Date()
    response.send(`<p>Phonebook has info to ${numberPersons} people</p>

     <p>the time is ${time}</p>`
    )
    //response.send(`<p> the time is ${time}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => { //实现分别取得每个id的内容
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
            //response.status(400).send({error: 'id missing'})
        })
})
// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)
//     if (person) {
//         response.json(person)
//     } else {
//         response.status(404).end()
//     }
// })
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)


//     response.status(204).end()
// })
// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)

//     response.status(204).end()
//   })


app.post('/api/persons', (request, response, next) => { //添加新的person
    const body = request.body
    console.log('body:', body)
    if (body.name && body.phone === null) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        phone: body.phone,
        id: Math.floor(Math.random() * 1000)
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})
app.delete('/api/persons/:id', (request, response, next) => { //删除功能
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
const errorHandle = (error, request, response, next) => { //将错误封装在中间件中
    console.log(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return status(404).send({ error: 'id is missing' })
    }
    next(error)
}
app.use(errorHandle)
app.put('/api/persons/:id', (request, response, next) => { //实现name相同，phone不同的更新功能
    const body = request.body
    const person = {
        name: body.name,
        phone: body.phone
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})
// app.post('/api/persons', (request, response) => {
//     const body = request.body;
//     console.log(body)
//     if (!body.name ) {
//         return response.status(404).json(
//             { error: 'name must be uniqe' }
//         )
//     }
//     if(!body.phone){
//         return response.status(404).json({
//             error: "phoneNumber must be uniqe"
//         })
//     }
//     person.forEach(person => {
//         if(person.name === body.name || person.phone === body.phone){
//             return response.status(404).json({
//                 erroe: "this name already exists"
//             })
//         }
//     })
//     const person = {
//         name: body.name,
//         number: body.phone,
//         id:  Math.floor(  Math.random() * 1000)
//     }

//     // persons = persons.concat(person)
//     // response.json(person)
// })


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

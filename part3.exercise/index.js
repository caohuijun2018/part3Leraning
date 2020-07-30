const http = require('http')

const express = require('express')
const { response, request } = require('express')
const app = express()
const morgan = express('morgan')
const Person = require('./models/person.js')






//const Person = mongoose.model('Person', personSchema)


const cors = require('cors')
app.use(cors())
app.use(express.json())


let persons = [
    {
        name: "Arto Hellas",
        number: "034-123456",
        id: 1
    },
    {
        name: "Ada Lovelac",
        number: "39-44-5325525",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234325",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]
app.get('/api/persons',(request,response) => {
    //console.log(Person.find( person => person.id === 1))
    Person.find({}).then( persons => {
        response.json(persons)
    })
})

app.get('/api/notes', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
  
// app.get('/api/persons', (requese, response) => {
//     response.json(persons)
// })
app.get('/info', (request, response) => {
    let numberPersons = persons.length;
    let time = new Date()
    response.send(`<p>Phonebook has info to ${numberPersons} people</p>

    <p>the time is ${time}</p>`
    )
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)


    response.status(204).end()
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })
app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body)
    if (!body.name ) {
        return response.status(404).json(
            { error: 'name must be uniqe' }
        )
    }
    if(!body.number){
        return response.status(404).json({
            error: "phoneNumber must be uniqe"
        })
    }
    persons.forEach(person => {
        if(person.name === body.name || person.number === body.number){
            return response.status(404).json({
                erroe: "this name already exists"
            })
        }
    })
    const person = {
        name: body.name,
        number: body.number,
        id:  Math.floor(  Math.random() * 1000)
    }
    
    persons = persons.concat(person)
    response.json(person)
})

  
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

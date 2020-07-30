const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]
console.log("argv =",process.argv )
const url =
  `mongodb://localhost:27017/test`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    phone: phone
})
// const person2 = new Person({
//     name: name,
//     phone: phone
// })
person.save().then(result => {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
          mongoose.connection.close()
        
        })
        console.log('person saved!')
        
    
    
})
})

    
  


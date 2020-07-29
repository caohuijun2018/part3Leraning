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
person.save().then(result => {
    console.log('person saved!')
    Person.find({}).then(result => {
        mongoose.connection.close()
        result.forEach(person => {
            console.log(person)
        })
    })
})


// Person.find({}).then(result1 => {
//     person.save().then(result => {
//         console.log('person saved!')
        
//         //mongoose.connection.close()
//       })
    
    
    //mongoose.connection.close()
//})

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })
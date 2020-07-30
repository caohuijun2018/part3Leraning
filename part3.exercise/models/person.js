const mongoose = require('mongoose')
const url =
  `mongodb://localhost:27017/test`
  console.log('connected to MongoDB')
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( result => {
        console.log('connected to MonghDB')
    })
        .catch((error => {
            console.log('error connecting to MonghDB:' , error.message)
        }))

  const personSchema = new mongoose.Schema({
      name: String,
      phone: String
    
  })
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  module.exports = mongoose.model('Person',personSchema)
const bcrypt = require('bcrypt')
const userRounter = require('express').Router()
const User = require('../models/user')
const { request, response } = require('express')
const { populate } = require('../models/user')

userRounter.get('/', async(request,response)=> {
    const users = await User.find({}).populate('blogs')
     
    response.json(users)
})



userRounter.post('/', async (request,response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })


    try{
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(error){
        return response.status(400).json({erro: 'name is exits'})
    }
    
    
})

module.exports = userRounter
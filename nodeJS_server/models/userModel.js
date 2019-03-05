const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema ({
    name:{
        first_name: {
            type: "string",
            required: true,
        },
        last_name:{
            type: "string",
            required: true,
        }
    },
    email: {
        type: "string",
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Your email is not valid.'
        }
    },
    password: {
        type: "string", 
        required: true,
        minlength: 8
    }, 
    image:{
        type: "string"
    },
    tokens: [{
        token: {
            type: "string",
            required: true
        }
    }]
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
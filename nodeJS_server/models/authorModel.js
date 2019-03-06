const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema ({
    
    first_name: {
        type: "string",
        required: true
    },
    last_name: {
        type: "string", 
        required: true
    },
    birth_date:{
        type: "date",
        required:true
    }
})

const authorModel = mongoose.model('author', authorSchema)
module.exports = authorModel
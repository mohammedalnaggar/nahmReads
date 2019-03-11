const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema ({
    name:{
            type: "string",
            required: true
    },
    author_id: {
        type: "string", 
        required: true,
        ref: "author"
    }, 
    category_id:{
        type: "string",
        required: true,
        ref: "category"
    },
    rating:{
        type:Number,
        min:0,
        max:5
    }
})

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel
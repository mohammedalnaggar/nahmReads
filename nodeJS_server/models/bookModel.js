const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema ({
    name:{
            type: "string",
            required: true
    },
    author_id: {
        type: "string", 
        required: true,
<<<<<<< HEAD
        ref: 'author'
=======
        ref: "author"
>>>>>>> 26c63211e8ae31389d71d8e14c7060aa216640ae
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
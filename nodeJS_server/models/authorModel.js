const mongoose = require('mongoose')
const bookModel = require('./bookModel')
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
//post hook for delete
authorSchema.post("findOneAndDelete",function(doc) {
    bookModel.deleteMany({ author_id: doc._id}, (err) => {
        if (!err) {
            console.log("books of this author have been successfuly deleted")
        }
    })
})
const authorModel = mongoose.model('author', authorSchema)
module.exports = authorModel
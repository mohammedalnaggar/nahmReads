const mongoose = require('mongoose')
const bookModel = require('./bookModel')
const categorySchema = new mongoose.Schema ({
    
    name: {
        type: "string",
        required: true
    }
})
//post hook for delete
categorySchema.post("findOneAndDelete",function(doc) {
    console.log(doc._id)
    bookModel.deleteMany({ category_id: doc._id}, (err) => {
        if (!err) {
            console.log("books of this category have been successfuly deleted")
        }
    })
})

const categoryModel = mongoose.model('category', categorySchema)
module.exports = categoryModel
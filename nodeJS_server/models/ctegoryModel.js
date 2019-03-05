const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema ({
    
    name: {
        type: "string",
        required: true
    }
})

const categoryModel = mongoose.model('category', categorySchema)
module.exports = categoryModel
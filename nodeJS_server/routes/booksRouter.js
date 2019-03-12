const express = require('express')
const bookModel = require('../models/bookModel')
const booksRouter = express.Router()
///////////////////////////////////////////////////////////////////////
///////////////////books page router//////////////////////////////////
booksRouter.get('/', (req, res) => {
    bookModel.find({})
    .populate({path:'author_id',select:"first_name last_name"})
    .select("name author_id")
    .then((data)=>{
            res.send(data)
    })
})
///////////////////////////////////////////////////////////////////////
///////////////////book page router//////////////////////////////////
booksRouter.get('/:id', (req, res) => {
    bookModel.findById(req.params.id)
    .populate({path:'author_id',select:"first_name last_name"})
    .populate('category_id')
    .then((data)=>{
            res.send(data)
    })
})
module.exports = booksRouter

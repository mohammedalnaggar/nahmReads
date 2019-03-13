const userModel = require('../models/userModel')
const authorModel = require('../models/authorModel')
// const bookModel = require('../models/bookModel')
const express = require('express')
const homeRouter = express.Router()
//list authors to user
homeRouter.post("/", (req, res) => {
    // let new_req = JSON.parse(Object.keys(req.body)[0])
    let new_req = req.body
    let user = new_req.user_id
    let data_object = { books: null, authors: [] }
    userModel.findById(user)
        .populate("books.book_id")
        .select("books")
        .then((data) => {
            data_object.books = data
            const arr_len=data.books.length
            let inc=0
            data.books.forEach((book) => {
                authorModel.findById(book.book_id.author_id).select("first_name last_name")
                    .exec((err, author) => {
                        if (!err) { data_object.authors.push(author) }
                        console.log("hi")
                        inc++
                        if (inc==arr_len){res.send(data_object)}
                    })
            })

        })
});



module.exports = homeRouter
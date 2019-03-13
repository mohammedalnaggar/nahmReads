const express = require('express')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const commentModel = require('../models/commentModel')
const booksRouter = express.Router()
///////////////////////////////////////////////////////////////////////
///////////////////books page router//////////////////////////////////
booksRouter.get('/', (req, res) => {
    bookModel.find({})
        .populate({ path: 'author_id', select: "first_name last_name" })
        .select("name author_id")
        .then((data) => {
            res.send(data)
        })
})
///////////////////////////////////////////////////////////////////////
///////////////////book page router//////////////////////////////////
booksRouter.post('/:id', (req, res) => {
    // let new_req = JSON.parse(Object.keys(req.body)[0])
    let new_req = req.body
    let user = new_req.user_id
    let book_data = { book: null, status: null, user_rating: null }
    userModel.findById(user)
        .then((data) => {
            data.books.forEach((book) => {
                if (req.params.id == book.book_id) {
                    book_data.status = book.status
                    book_data.user_rating = book.user_rating
                }
            })
        })
    bookModel.findById(req.params.id)
        .populate({ path: 'author_id', select: "first_name last_name" })
        .populate('category_id')
        .then((data) => {
            book_data.book = data
            res.send(book_data)
        })
})
///////////////////////////////////////////////////////////////////////
///////////////////book rating router//////////////////////////////////
booksRouter.post('/:id/rate', (req, res) => {
    // let new_req = JSON.parse(Object.keys(req.body)[0])
    let new_req = req.body
    let user = new_req.user_id
    let booksArr = []
    userModel.findById(user)
        .then((data) => {
            data.books.forEach((book) => {
                if (req.params.id == book.book_id) {
                    book.user_rating = new_req.user_rating
                    booksArr.push(book)
                }
            })
            console.log(booksArr)
            if (booksArr.length != 0) {
                userModel.updateOne({ _id: user }, { books: booksArr })
                    .then((err) => {
                        if (!err) {
                            console.log("updated")
                        }
                    })
                bookModel.findOne({_id:req.params.id}).exec((err,data)=>{
                    if (!err){console.log(data)}
                })    
            }
        })

})
///////////////////////////////////////////////////////////////////////
///////////////////book shelving router//////////////////////////////////
booksRouter.post('/:id/shelve', (req, res) => {
    // let new_req = JSON.parse(Object.keys(req.body)[0])
    let new_req = req.body
    let user = new_req.user_id
    let booksArr = []
    flag=false
    userModel.findOne({ _id: user })
        .then((data) => {
            data.books.forEach((book) => {
                if (req.params.id == book.book_id) {
                    book.status = new_req.status
                    flag=true
                }
                booksArr.push(book)
            })
            if (!flag) { booksArr.push({ book_id: req.params.id, status: new_req.status, user_rating: 0 }) }
            console.log(booksArr)
            userModel.updateOne({ _id: user }, { books: booksArr })
                .then((err) => {
                    if (!err) console.log("done")
                })
        })

})
///////////////////////////////////////////////////////////////////////
/////////////////////////////load book reviews//////////////////////////////
booksRouter.get('/:id/comments', (req, res) => {
    commentModel.find({book_id:req.params.id}).populate("user_id").select("user_id comment")
    .then((data)=>{
            res.send(data)
    })
})
///////////////////////////////////////////////////////////////////////
/////////////////////////////save book reviews//////////////////////////////
booksRouter.post('/:id/comments', (req, res) => {
    // let new_req = JSON.parse(Object.keys(req.body)[0])
    let new_req=req.body
    let new_comment = {
        comment: new_req.comment,
        user_id: new_req.user_id,
        book_id: req.params.id
    }

    commentModel.create(new_comment, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.redirect(`/books/${req.params.id}/comments`)
        }
    })
})

module.exports = booksRouter
const express = require('express')
const adminModel = require('../models/adminModel')
const bookModel = require('../models/bookModel')
const jwt = require('jsonwebtoken')

const adminRouter = express.Router()

adminRouter.post('/', (req, res) => {

    let newReq = JSON.parse(Object.keys(req.body)[0])
    console.log(newReq)
    adminModel.find({ email: newReq.email, password: newReq.password }, (err, data) => {
        if (err || data.length === 0) {
            console.log(err)
            res.send(err);
        } else {
            console.log(newReq.email)
            // console.log(data[0].tokens)
            //create token here.
            const data2 = {
                check: true
            }
            let token = {
                token: jwt.sign(data2, "secret", {
                    //expiresIn: 1 //minutes
                })
            }

            const ntokens = [];
            ntokens.push(token);

            adminModel.updateOne({ email: newReq.email, password: newReq.password },
                { $set: { tokens: ntokens } }, (err, data) => {
                    if (err)
                        console.log(err)
                    else {
                        console.log(data)
                        console.log(token)
                        res.send(token)
                    }
                });
            // console.log(token)
            // res.send(token)
        }
    })

})
// list books to the admin
adminRouter.get('/books', (req, res) => {
    bookModel.find({}, (err, books) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(books)
        }

    })
})
// add book
adminRouter.post('/books', (req, res) => {
    let new_req = JSON.parse(Object.keys(req.body)[0])

    let new_book = {
        name: new_req.name,
        category_id: new_req.category_id,
        author_id: new_req.author_id,
        rating: new_req.rating
    }

    bookModel.create(new_book, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.redirect("/admin/books")
        }
    })

})
module.exports = adminRouter



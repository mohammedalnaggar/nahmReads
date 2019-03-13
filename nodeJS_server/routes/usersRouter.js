const mongoose = require('mongoose')
const express = require('express')
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')
const categoryModel = require('../models/categoryModel')
const jwt = require('jsonwebtoken')
const send_mail = require("../connection/mail")
const usersRouter = express.Router()
ObjectId = require('mongodb').ObjectID;

// signing up new user
usersRouter.post('/', (req, res) => {
    new_req = JSON.parse(Object.keys(req.body)[0])
    console.log(new_req)
    // check if the email already exists
    userModel.find({ email: new_req.email }, (err, data) => {
        if (!err) {
            if (!data[0]) {
                // register newuser
                console.log(new_req)

                // create a token
                const data = {
                    check: true
                }
                let token = {
                    token: jwt.sign(data, "naggarsecret", {
                        expiresIn: 1 //minutes
                    })
                }
                // attach token on the user object body
                // new_user.tokens = [token];
                let new_user = {
                    name: {
                        first_name: new_req.first_name,
                        last_name: new_req.last_name
                    },
                    email: new_req.email,
                    password: new_req.password,
                    tokens: [
                        token
                    ]
                }
                console.log(new_user)

                userModel.create(new_user, (err, data) => {
                    if (err) {
                        // as long as all fields will not be null from client side >> check mail only not
                        // existing
                        res.send(err)
                        res.json({ message: "Email already exists .. from create!" })
                    }
                    else {
                        res.send({
                            message: "auth",
                            token
                        })
                        console.log("hiiiiiiii")
                        send_mail(new_req.email)
                    }
                })
            } else {
                res.json({ message: "Invalid email!" })
            }
        } else {
            res.send(err);
        }
    })
})

usersRouter.post('/login', (req, res, next) => {

    new_req = JSON.parse(Object.keys(req.body)[0])

    console.log(new_req)
    userModel.find({ email: new_req.email, password: new_req.password }, (err, data) => {
        if (!err) {
            if (data[0]) {
                // create a new token for logged in user
                const data2 = {
                    check: true
                }
                let token = {
                    token: jwt.sign(data2, "naggarsecret", {
                        expiresIn: 1 //minutes
                    })
                }
                let new_tokens = []
                data[0].tokens.forEach(function (e) {
                    new_tokens.push(e);
                })

                new_tokens.push(token)
                console.log(new_tokens)

                userModel.updateOne({ email: new_req.email }, {
                    $set: {
                        tokens: new_tokens
                    }
                }, (err, data) => {
                    if (!err) {
                        console.log()
                        // send the new token to the client
                        res.send({
                            message: "authinticated",
                            token
                        });
                    } else {
                        res.send(err)
                    }
                })

            } else {
                res.send('No match for this id')
            }
        } else {
            res.send('Err in finding id')
        }
    })
})

//list categories
usersRouter.get("/categories", (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});

//middleware for books and authors list of a specific category
// usersRouter.get('/category/:id', function (req, res) {
//     let data_object = { book: null, author: null }
//     let books_authors4category = []
//     bookModel.find({ category_id: req.params.id  }).then((books4category) => {
//         books4category.forEach(function (element) {
//             data_object.book = element;
//             authorModel.find({_id:element.author_id }).then((author4book) => {
//                 // console.log(author4book)
//                 data_object.author = author4book[0];
//                 // console.log(data_object);
//             books_authors4category.push(data_object);
//                 // console.log(books_authors4category)
//                 // console.log(data_object.author)
//             })
//             // console.log("```````````````````````````````")

//         });
//     })
//     res.send(books_authors4category);
// })

usersRouter.get('/category/:id', function (req, res) {
    // data_object = { "book": null, "author": null }
    // books_authors4category = []
     bookModel.find({ category_id: req.params.id }, function (err, books4category) {
    
    }).populate('author_id').populate('category_id').exec(function (err, author_i) {
        console.log(author_i)
        // console.log(author_i[0].author_id.first_name)
        res.send(author_i)  
        
    });
   
})


module.exports = usersRouter
const userModel = require('../models/userModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const jwt = require('jsonwebtoken')
const send_mail=require("../connection/mail")
const express = require('express')
const usersRouter = express.Router()
ObjectId = require('mongodb').ObjectID;

// signing up new user
usersRouter.post('/', (req, res) => {
    new_req = JSON.parse(Object.keys(req.body)[0])
    // check if the email already exists
    userModel.find({
        email: new_req.email
    }, (err, data) => {
        if (!err) {
            if (!data[0]) {
                // register newuser
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
                    ],
                    books:[]
                }
                userModel.create(new_user, (err, data) => {
                    if (err) {
                        // as long as all fields will not be null from client side >> check mail only not
                        // existing
                        res.send(null)

                    } else {
                        res.send({
                            user_id:data._id,
                            message: "auth",
                            token
                        })
                        send_mail(new_req.email)
                    }
                })
            } else {
                res.send(null)
            }
        } else {
            res.send(null);
        }
    })
})

usersRouter.post('/login', (req, res, next) => {

    new_req = JSON.parse(Object.keys(req.body)[0])

    userModel.find({
        email: new_req.email,
        password: new_req.password
    }, (err, data) => {
        if (!err) {
            if (data[0]) {
                // create a new token for logged in user
                let user_id=data[0]._id
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

                userModel.updateOne({
                    email: new_req.email
                }, {
                    $set: {
                        tokens: new_tokens
                    }
                }, (err, data) => {
                    if (!err) {
                        // send the new token to the client
                        console.log("token value" + token.token)
                        res.send({
                            user_id,
                            message: "authinticated",
                            token
                        });
                    } else {
                        res.send(null)
                    }
                })

            } else {
                res.send(null)
            }
        } else {
            res.send(null)
        }
    })
})

//information and data for Author page
usersRouter.get("/:idU/:idA", (req, res) => {
    const data_object = {
        author: null,
        authorbooks: null
    }
    authorModel.findOne({
            _id: req.params.idA
        })
        .then((data) =>
         {
            data_object.author = data
        })
    const authorbooks = null
    bookModel.find({
        author_id: req.params.idA
    }, function (err, data)
     {
        if (!err)
            authorbooks = data
    }
    )
    const userbooks = null
    userModel.findOne(
        {
        _id: req.params.idU
    }, function (err, data) 
    {
        if (!err)
            userbooks = data.books
    }
    )

    authorbooks.forEach(function (authorbook) {
        userbooks.forEach(function (userbook) {
            if (authorbook._id === userbook.book_id) {
                authorbook.status = userbook.status
                authorbook.user_rating = userbook.user_rating
            }
            else
            {
                authorbook.status = null
                authorbook.user_rating = null

            }

        }
        )

    }
    ).then(() => 
    {
        data_object.authorbooks = authorbooks
        res.send(data_object)
    }
    )
}
)

//list authors to user
usersRouter.get("/authors", (req, res) => {
    authorModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});

module.exports = usersRouter
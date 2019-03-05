const express = require('express')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const usersRouter = express.Router()


// for signing up new user
usersRouter.post('/', (req, res) => {

    console.log(req.body)
    // check if the email already exists
    userModel.find({email: req.body.email} , (err, data) => {
        if(!err){
            if(!data[0]){
                // register newuser
                console.log(req.body)
                let new_user = new userModel
                new_user.name.first_name = req.body.name.first_name
                new_user.name.last_name = req.body.name.last_name
                new_user.email = req.body.email
                new_user.password = req.body.password
                
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
                new_user.tokens = [token];
                console.log(token)
                userModel.create( new_user , (err , data) => {
                    if(err){
                        // as long as all fields will not be null from client side >> check mail only not
                        // existing
                        res.json({ message: "Invalid saving in create!" })
                    }
                    else {
                        res.send(data)
                    }
                })
            } else {
                res.json({ message: "Invalid email!" })
            }
        }
    })
})

usersRouter.post('/login', (req, res, next) => {
    console.log(req.body)

    userModel.find({email: req.body.email , password : req.body.password} , (err, data) =>{
        if(!err){
            if(data[0]){
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
                data[0].tokens.forEach(function (e){ 
                    new_tokens.push(e);
                })
                                
                new_tokens.push(token)
                console.log(new_tokens)

                userModel.updateOne({email: req.body.email}, {$set: {
                    tokens: new_tokens
                }}, (err, data) => {
                    if(!err){
                        console.log()
                        res.send(new_tokens);
                    } else {
                        res.send(err)
                    }
                } )
                
            }else {
                res.send('No match for this id')
            }
        } else {
            res.send('Err in finding id')
        }
    })
})




module.exports = usersRouter
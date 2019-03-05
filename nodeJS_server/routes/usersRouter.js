const express = require('express')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const usersRouter = express.Router()


// signing up new user
usersRouter.post('/', (req, res) => {
    new_req = JSON.parse(Object.keys(req.body)[0])
    console.log(new_req)
    // check if the email already exists
    userModel.find({email: new_req.email} , (err, data) => {
        if(!err){
            if(!data[0]){
                // register newuser
                console.log(new_req)
                
                // new_user.name.first_name = new_req.first_name
                // new_user.name.last_name = new_req.last_name
                // new_user.email = new_req.email
                // new_user.password = new_req.password
                
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

                userModel.create( new_user , (err , data) => {
                    if(err){
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
                    }
                })
            } else {
                res.json({ message: "Invalid email!" })
            }
        } else{
            res.send(err);
        }
    })
})

usersRouter.post('/login', (req, res, next) => {

    new_req = JSON.parse(Object.keys(req.body)[0])

    console.log(new_req)
    userModel.find({email: new_req.email , password : new_req.password} , (err, data) =>{
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

                userModel.updateOne({email: new_req.email}, {$set: {
                    tokens: new_tokens
                }}, (err, data) => {
                    if(!err){
                        console.log()
                        // send the new token to the client
                        res.send({
                            message: "authinticated",
                            token
                        });
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
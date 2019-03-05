const express = require('express')
const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const adminRouter = express.Router()

adminRouter.post('/', (req, res) => {

    let newReq = JSON.parse(Object.keys(req.body)[0])
    console.log(newReq)
    adminModel.find({ email: newReq.email, password: newReq.password }, (err, data) => {
        if (err || data.length === 0) {
            console.log(err)
            res.send(err);
        }else {
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

module.exports = adminRouter
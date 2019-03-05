const express = require('express')
const adminModel = require('../models/adminModel')
const authorRouter = require('../models/authorModel')
const categoryRouter = require('../models/categoryModel')
const jwt = require('jsonwebtoken')
const adminRouter = express.Router()

//validate admin data
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

//list authors
authorRouter.get("/authors",(req,res)=>{
    authorRouter.find({},(err,data)=>{
        if(!err)
    res.JSON(data);
});
});

//list categories
categoryRouter.get("/categories",(req,res)=>{
    if(!err)
    authorRouter.find({},(err,data)=>{
    res.JSON(data);
});
});

//add author
authorRouter.post("/authors",(req,res)=>{
    let newReq = JSON.parse(Object.keys(req.body)[0])
    const author = new authorModel({first_name:newReq.first_name,last_name:newReq.last_name,birth_date:newReq.birth_date});
    author.save((err,data)=>{
        if(!err)res.redirect("/admin/authors");
});
});

//add category
categoryRouter.post("/categories",(req,res)=>{
    let newReq = JSON.parse(Object.keys(req.body)[0])
    const category = new categoryModel({name:newReq.name});
    category.save((err,data)=>{
        if(!err)res.redirect("/admin/categories");
});
});

module.exports = adminRouter
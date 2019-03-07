const express = require('express')
const adminModel = require('../models/adminModel')
const authorModel = require('../models/authorModel')
const categoryModel = require('../models/categoryModel')
const bookModel = require('../models/bookModel')
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
            res.send(books)
        }

    })
})
// add book
adminRouter.post('/books', (req, res) => {
    let new_req = JSON.parse(Object.keys(req.body)[0])
    // let new_req=req.body

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
//edit book
adminRouter.put('/books/:id', (req, res) => {
    let new_req = JSON.parse(Object.keys(req.body)[0])
    // let new_req = req.body
    bookModel.updateOne({ _id: req.params.id }, {
        name: new_req.name,
        category_id: new_req.category_id,
        author_id: new_req.author_id,
        rating: new_req.rating
    }, (err) => {
        if (!err)
            res.redirect("/admin/books")
    })
})
// delete book
adminRouter.delete('/books/:id', function (req, res) {
    bookModel.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (!err) {
            res.redirect("/admin/books");
        }
    })
});


//list authors
adminRouter.get("/authors", (req, res) => {
    authorModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});

//add author
adminRouter.post("/authors",(req,res)=>{
    let newReq = JSON.parse(Object.keys(req.body)[0])
    // let newReq=req.body
    console.log(newReq)
    const author = new authorModel({first_name:newReq.first_name,last_name:newReq.last_name,birth_date:newReq.birth_date});
    author.save((err,data)=>{
        if(!err)res.redirect("/admin/authors");
});
});
//edit author
adminRouter.put("/authors/:id", (req, res) => {
    let newReq = JSON.parse(Object.keys(req.body)[0])
    // let newReq = req.body
    authorModel.updateOne({ _id: req.params.id }, { first_name: newReq.first_name, last_name: newReq.last_name, birth_date: newReq.birth_date }
        , (err) => {
            if (!err)
                res.redirect("/admin/authors");
        });
});
//delete author
adminRouter.delete('/authors/:id', function (req, res) {
    authorModel.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (!err) {
            res.redirect("/admin/authors");
        }
    })
});



//list categories
adminRouter.get("/categories", (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (!err)
            console.log(data)
        res.send(data);
    });
});


//add category
adminRouter.post("/categories",(req,res)=>{
    let newReq = JSON.parse(Object.keys(req.body)[0])
    // let newReq=req.body
    console.log(newReq)
    const category = new categoryModel({name:newReq.name});
    category.save((err,data)=>{
        if(!err)res.redirect("/admin/categories");
    });
});

//edit category
adminRouter.put("/categories/:id", (req, res) => {
    let newReq = JSON.parse(Object.keys(req.body)[0])
    // let newReq = req.body
    categoryModel.updateOne({ _id: req.params.id }, { name: newReq.name }, (err) => {
        if (!err)
            res.redirect("/admin/categories");
    });
});
//delete category
adminRouter.delete('/categories/:id', function (req, res) {

    categoryModel.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (!err)
            res.redirect("/admin/categories")
    }
    )

});
//middleware for categories and authors lists
adminRouter.get('/data', function (req, res) {
    const data_object = { categories: null, authors: null }
    categoryModel.find({})
        .then((data) => {
            data_object.categories = data
        })
    authorModel.find({})
        .then((data) => {
            data_object.authors = data
        }).then(() => { res.send(data_object) })
})

module.exports = adminRouter


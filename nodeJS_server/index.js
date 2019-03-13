#! /usr/bin/env node

const PORT = process.env.PORT || 5000;
const express = require('express');
require('./connection/DBconnector')

const app = express();

const usersRouter = require('./routes/usersRouter')
const adminRouter = require('./routes/adminRouter')
const authorsRouter = require('./routes/authorsRouter')
const booksRouter = require('./routes/booksRouter')

app.use(express.urlencoded());
app.use(express.json())

// allow client to recive ajax requests
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    next();
});

// users route handler
app.use('/users', usersRouter)


// admin route handler
app.use('/admin', adminRouter)
app.use('/authors', authorsRouter)

// books route handler
app.use('/books', booksRouter)

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Listening on port: ${PORT}`)
})

#! /usr/bin/env node

const PORT = process.env.PORT || 5000;
const express = require('express');
require('./connection/DBconnector')

const app = express();

const usersRouter = require('./routes/usersRouter')

app.use(express.urlencoded());
app.use(express.json())

// allow client to recive ajax requests
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    next();
});

app.use('/users', usersRouter)


app.listen(PORT,"0.0.0.0", () => {
    console.log(`Listening on port: ${PORT}`)
})

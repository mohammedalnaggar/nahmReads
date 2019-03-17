const fs=require("fs")
const express = require('express')
const photoRouter = express.Router()
photoRouter.post('/',express.static("/upload"),function(req,res){
    console.log("REQ",req.headers); //file is there in the body
    upload(req,res,function(err) {

        if(err) {
            console.log(err)
            return res.end(null);
        }
        console.log("File is uploaded")
        res.end(res.req.file.filename);
    });
});

photoRouter.get('/:image',function(req,res){
    let image=fs.readFileSync(process.cwd()+`/uploads/${req.params.image}`)
    let imageBuffer=new Buffer(image).toString('base64')
    res.send(imageBuffer)
})

module.exports = photoRouter
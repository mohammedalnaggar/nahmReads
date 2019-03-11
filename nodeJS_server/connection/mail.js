#!/usr/bin/env node
var nodemailer = require('nodemailer');
function send_mail(email){
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'nahm.reads@gmail.com',
           pass: 'nahm1234'
       }
   });

   const mailOptions = {
    from: 'nahm.reads@gmail.com', // sender address
    to: "dinag707@gmail.com", // list of receivers
    subject: 'welcome to nahm reads', // Subject line
    html: 'thank you for registering in nahm reads'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });}
 module.exports=send_mail
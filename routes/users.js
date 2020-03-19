var express = require('express');
var router = express.Router();
const User = require('../models/User');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');


router.get('/:id', function(req, res, next){
  const id = req.params.id;
  User.findById(id,function(err,result){
    if(err) return res.send(JSON.stringify({success: false,errMessage: err}));
    const data = {
      username: result.username,
      password: result.password,
      img: result.img,
      id: result._id
    };
    res.send(JSON.stringify(data))
  })
});

router.post('/',function(req,res,next){

  const form = formidable();
  form.uploadDir='./public/images/';

  form.parse(req,(err,fields,files)=>{
    if(err){
      next(err);
      return ;
    }
    const { id, username, password} = fields
    User.findById(id,function(err,result){
      if(err) return res.send(JSON.stringify({success: false,errMessage: err}));
      result.username = username;
      result.password = password;
      fs.rename(files.img.path,'./public/images/'+files.img.name+'.jpg',function(){
        result.img = './public/images/'+files.img.name+'.jpg';
        result.save((err,product)=>res.send(JSON.stringify({success: true,errMessage: null})))
      })
    })
  })
  // let body=''
  // req.on('data',data => body+=data);
  // req.on('end',()=>{
  //   console.log(body)
  //   res.send(body)
  // })
})

router.post('/:id', function(req, res, next){
  const id = req.params.id;
  User.findById(id,function(err,result){
    if(err) return next(err);
    result.username=req.body.username;
    result.password=req.body.password;
    result.img=req.body.img;
    result.save((err,result)=>{
      if(err) return res.send(JSON.stringify({ok: false}));
      res.send(JSON.stringify({ok: true}))
    })
  })
})

module.exports = router;

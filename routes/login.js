const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/',function(req,res,next){
    console.log(req.body,req.body.password)
    if(req.body.name){
        User.findOne({'name':req.body.name},function(err,result){
            if(err) return res.json(JSON.stringify({error: '数据库查询错误！'}));
            if(!result) return res.json({error: '用户名错误，请重新输入'}) 
            if(result.password===req.body.password){return res.json({success: '登录成功'})}else{return res.json({error: '密码错误'})}
        })
    }else{
        res.send('未收到页面数据')
    }
})

module.exports=router;
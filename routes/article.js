const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/list',function(req,res,next){
    Article.find()
        .exec(function(err,result){
            if(err) return next(err);
            let lists = result.map((item)=>{
                return {
                    title: item.title,
                    id: item.id,
                    keywords: item.keywords,
                    date: item.date,
                    classification: item.classification
                }
            })

            res.send(JSON.stringify(lists))
        })
})

router.get('/:id',function(req,res,next){
    Article.findById(req.params.id)
        .exec(function(err, result){
            if(err) return next(err);
            res.send(JSON.stringify(result))
        })
})

router.post('/:id',function(req,res,next){
    Article.findById(req.params.id)
        .exec(function(err,result){
            if(err) return next(err);
            result.title = req.body.title;
            result.author = req.body.author;
            result.editorState = req.body.editorState;
            result.like = req.body.like;
            result.date = req.body.date;
            result.keywords = req.body.keywords;
            result.save(function(err,product){
                if(err) return next(err);
                res.send(JSON.stringify(product))
            })
        })
})

router.put('/',function(req,res,next){
    let newArticle = new Article({
        title: req.body.title,
        author: req.body.author,
        editorState: req.body.editorState,
        date: req.body.date,
        keywords: req.body.keywords,
        like: req.body.like,
        classification: req.body.classification
    })

    newArticle.save(function(err,product){
        if(err) return next(err);
        res.send(JSON.stringify(product))
    })
})

router.delete('/:id',function(req,res,next){
    Article.findOneAndDelete({_id:req.params.id},function(err,product){
        if(err){
            res.send(JSON.stringify({error: true}));
        }else{
            res.send(JSON.stringify({error: false,deleteId:product._id}));
        }   
    })
})

router.post('/like/:id',function(req,res,next){
    Article.findById(req.params.id,function(err,result){
        if(err) return next(err);
        result.like++;
        result.save((err,result)=>{
            if(err) return next(err);
            res.send(JSON.stringify(result.like))
        })
    })
})

module.exports = router;


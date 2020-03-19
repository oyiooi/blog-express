const Article = require('../models/Article')

exports.article_list = (req, res, next) => {
    Article.find()
        .exec(function(err,articlelist){
            if(err) return next(err)
            res.status(200).json(articlelist)
        })
}

exports.article_get = (req, res, next) => {
    
}

exports.article_post = (req, res, next) => {
    const data = new Article({
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        keyWord: req.body.keyWord,
        praiseCount: req.body.praiseCount
    })

    data.save(function(err){
        if(err) return next(err)
        Article.find()
            .exec(function(error,all){
                if(error) return next(error)
                res.status(200).json(all)
            })
    })
}

exports.article_delete = (req, res, next) => {
    Article.findById(req.params.id)
        .exec(function(err,result){
            if(err)return next(err)
            result.remove(function(err,product){
                if(err) return next(err)
                res.status(200).json(product)
            })
        })
}

exports.article_put = (req, res, next) => {
    Article.findByIdAndUpdate(req.params.id,req.body)
        .exec(function(err,result){
            if(err)return next(err)
            res.json(result)
        })
}
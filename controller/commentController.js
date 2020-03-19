const Comment = require('../models/Comment')

exports.comment_list = (req, res, next) => {
    Comment.find()
        .exec(function(err, comment_list){
            if(err) return next(err)
            res.status(200).json(comment_list)
        })
}

exports.comment_get = (req, res, next) => {
    Comment.find({belong: req.params.id})
        .exec(function(err, comments){
            if(err) return next(err)
            res.status(200).json(comments)
        })
}

exports.comment_put = (req, res, next) => {
    const query = {id = req.params.id}, update = {
        name: req.body.name, 
        content:req.body.content,
        date: req.body.date,
        belong: req.body.belong
    };
    Comment.findOneAndUpdate(query,update,function(err){
        if(err) return next(err)
        res.send('ok')
    })
}

exports.comment_post = (req, res, next) => {
    const newComment = new Comment({
        name: req.body.name,
        content: req.body.content,
        date: req.body.date,
        belong: req.body.belong
    })

    newComment.save(function(err){
        if(err) return next(err)
        res.send('ok')
    })
}

exports.comment_delete = (req, res, next) => {
    Comment.findOneAndRemove(req.params.id, function(err){
        if(err) return next(err)
        res.send('ok')
    })
}
var express = require('express');
var router = express.Router();
const articleController = require('../controller/articleController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/a',articleController.article_list)
module.exports = router;

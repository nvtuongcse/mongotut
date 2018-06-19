var express = require('express');
var router = express.Router();
var Article = require('../schema/Article');


/* GET users listing. */
router.get('/', function (req, res, next) {
  Article.find({}, function (err, article) {
    if (err) return console.log(err)
    res.send(JSON.stringify(article))
  })
});

router.post('/', function (req, res, next) {

  const { title, author, body, meta } = req.body;

  var node = new Article({
    title: title,
    author: author,
    body: body,
    meta: meta
  });

  node.save(function (err, data) {
    if (err) return res.send({
      code: -1,
      message: err.message
    })
    res.send({
      code: 0,
      message: 'success'
    })
  })

})

router.put('/:id', function (req, res, next) {
  const id = req.params.id
  const { title, author, body, meta } = req.body;
  Article.findByIdAndUpdate(id, {
    $set: {
      title: title,
      author: author,
      body: body,
      meta: meta
    }
  }, function (err, article) {
    if (err) return res.send({
      code: -1,
      message: err.message
    })
    article.save(function (err, article) {
      if (err) return res.send({
        code: -1,
        message: err.message
      })
    })
    res.send({
      code: 0,
      message: 'success'
    })
  })
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(id)
  Article.findByIdAndRemove(id, function (err, resp) {
    if (err) return res.send({
      code: -1,
      message: err.message
    })
    res.send({
      code: 0,
      message: 'Delete successfully!'
    })
  })
})


module.exports = router;

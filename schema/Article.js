var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    meta: {
      votes: Number,
      favs: Number
    }
  });

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
const express = require('express')
const app = express()
const { getTopics, getHello } = require('./controllers/topics.js')
const { getArticles, getArticleById,  } = require('./controllers/articles.js')
const { getAllCommnetsByArticleId, postCommentByArticleId } = require('./controllers/comments.js')
const { getUsers } = require('./controllers/users.js')

app.use(express.json())

app.get('/', getHello)

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getAllCommnetsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid input" });
  } else if (err.code === "23503") {
    res.status(400).send({ message: "Reference does not exist" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app
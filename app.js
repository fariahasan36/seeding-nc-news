const express = require('express')
const app = express()
const { getTopics, getHello } = require('./controllers/topics.js')
const { getArticles, getArticleById,  } = require('./controllers/articles.js')
const { getAllCommnetsByArticleId } = require('./controllers/comments.js')
const { getUsers } = require('./controllers/users.js')

app.get('/', getHello)

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getAllCommnetsByArticleId)

module.exports = app


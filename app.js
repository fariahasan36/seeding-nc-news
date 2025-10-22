const express = require('express')
const app = express()
const { getTopics, getHello } = require('./controllers/topics.js')
const { getArticles } = require('./controllers/articles.js')

app.get('/', getHello)

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

module.exports = app


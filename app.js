const express = require('express')
const app = express()
const { getTopics, getHello } = require('./controllers/topics.js')

app.get('/', getHello)

app.get('/api/topics', getTopics)

module.exports = app


const db = require('./db/connection.js')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/topics', (req, res) => {
    return db.query(`Select slug, description from topics`)
    .then(({rows}) =>{
         res.status(200).send({topics: rows})
    })
   
})

module.exports = app


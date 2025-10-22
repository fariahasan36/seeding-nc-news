const { readTopics } = require('../models/topics')

const getHello = (req, res) => {
  res.send('Hello World!')
}

const getTopics = (req, res) => {    
    readTopics().then(({rows}) =>{
         res.status(200).send({topics: rows})
    })   
}

module.exports = { getHello, getTopics }
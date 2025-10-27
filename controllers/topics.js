const { readTopics } = require('../models/topics')

const getHello = (req, res) => {
  res.send('Hello World!')
}

const getTopics = (req, res) => {    
    readTopics().then(({rows}) =>{

        if(rows.length===0){
          return Promise.reject({status: 404, message: "No Topics found"})
        }
         res.status(200).send({topics: rows})
    })   
}

module.exports = { getHello, getTopics }
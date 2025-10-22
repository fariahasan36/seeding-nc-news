const { readArticles } = require('../models/articles.js')

const getArticles = (req, res) => {
    readArticles().then(({rows}) => {
        res.status(200).send({ articles : rows })
    })
}

module.exports = { getArticles }
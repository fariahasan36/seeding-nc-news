const { readArticles,  readArticlesById, updateArticleById } = require('../models/articles.js')

const getArticles = (req, res) => {
    readArticles().then(({rows}) => {
        res.status(200).send({ articles : rows })
    })
}

const getArticleById = (req, res, next) => {
    const { article_id } = req.params

    const id = parseInt(article_id);

    readArticlesById(id)
    .then(({rows}) => {       
        if(rows.length === 0){
            return Promise.reject({status: 404, message: "Article not found"})
        } else {
            res.status(200).send({article: rows[0]})
        }       
    })
    .catch((err) => {
        next(err)
    })
}

const patchArticleByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const articleObj  = req.body

    updateArticleById(article_id, articleObj)
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, message: "Article not updated"})
        } else {
            res.status(200).send({article: rows[0]})
        }
        
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getArticles, getArticleById, patchArticleByArticleId }
const { readArticles,  readArticlesById, updateArticleById } = require('../models/articles.js')

const getArticles = (req, res) => {
    const queries = req.query
    return readArticles(queries)
        .then(({rows}) => {
            if(rows.length===0){
                return Promise.reject({status: 404, message: "Articles not found"})
            } else {
                res.status(200).send({ articles : rows })
            }
            
    })
}

const getArticleById = (req, res) => {
    const { article_id } = req.params

    return readArticlesById(article_id)
    .then(({rows}) => {       
        if(rows.length === 0){
            return Promise.reject({status: 404, message: "Article not found"})
        } else {
            res.status(200).send({article: rows[0]})
        }       
    })
}

const patchArticleByArticleId = (req, res) => {
    const { article_id } = req.params
    const articleObj  = req.body

    return updateArticleById(article_id, articleObj)
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, message: "Article not updated"})
        } else {
            res.status(200).send({article: rows[0]})
        }        
    })
}

module.exports = { getArticles, getArticleById, patchArticleByArticleId }
const { readArticles,  readArticlesById } = require('../models/articles.js')

const getArticles = (req, res) => {
    readArticles().then(({rows}) => {
        res.status(200).send({ articles : rows })
    })
}

const getArticleById = (req, res) => {
    const { article_id } = req.params

    const id = parseInt(article_id);
    console.log(id)

    if(!id){
        return res.status(400).send({message: "Invalid article id"})
    }
    readArticlesById(id)
    .then(({rows}) => {
       
        if(rows.length === 0){
            return res.status(404).send({message: "Article not found"})
        } else {
            res.status(200).send({article: rows[0]})
        }
       
    })
}

module.exports = { getArticles, getArticleById }
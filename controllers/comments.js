const { readCommentsByArticleId, createCommentByArticleId } = require('../models/comments.js')

const getAllCommnetsByArticleId = (req, res, next) => {
    const { article_id } = req.params

    const id = parseInt(article_id);

    readCommentsByArticleId(id)
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, message: "Comments not found"})
        } else {
            res.status(200).send({ comments : rows })
        }
    })
    .catch((err) => {
        next(err)
    }) 
}

const postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const commentObj  = req.body

    createCommentByArticleId(article_id, commentObj)
    .then((newComment) => {
        if(Object.keys(newComment).length === 0){
            return Promise.reject({status: 404, message: "Comment not added"})
        } else {
            res.status(200).send({ comment: newComment })
        }
        
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

module.exports = { getAllCommnetsByArticleId, postCommentByArticleId }
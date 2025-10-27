const { readCommentsByArticleId, createCommentByArticleId, deleteCommentById, getCommentById } = require('../models/comments.js')
const { checkArticleExists } = require("../models/articles.js")

const getAllCommnetsByArticleId = (req, res, next) => {
    const { article_id } = req.params

    const requestPromises = [readCommentsByArticleId(article_id)]    

    if(article_id){
        requestPromises.push(checkArticleExists(article_id))
    }
    return Promise.all(requestPromises)
    .then((results) => {
        res.status(200).send({ comments : results[0] })        
    })
    .catch(next)
}

const postCommentByArticleId = (req, res) => {
    const { article_id } = req.params
    const commentObj  = req.body

    return createCommentByArticleId(article_id, commentObj)
    .then((newComment) => {
        if(Object.keys(newComment).length === 0){
            return Promise.reject({status: 404, message: "Comment not added"})
        } else {
            res.status(200).send({ comment: newComment })
        }        
    })

}

const deleteCommentByCommentId = (req, res, next) => {
    const { comment_id } = req.params

    if(!/^[0-9]+$/.test(comment_id)){
        return res.status(400).send({message:"Invalid input"})
    }
    getCommentById(comment_id)
    .then(() => {
      return deleteCommentById(comment_id);
    })
    .then(()=>{
        res.status(204).send();
    })
    .catch(next);
}

module.exports = { getAllCommnetsByArticleId, postCommentByArticleId, deleteCommentByCommentId }
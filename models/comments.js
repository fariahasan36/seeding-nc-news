const db = require('../db/connection.js')

function readCommentsByArticleId (articleId) {
    return db.query(`Select comment_id, votes, created_at, author, body as comment_body, article_id from comments where article_id = $1 order by created_at desc`,  [articleId])
}

function createCommentByArticleId(articleId, commentObj) {
    if(Object.keys(commentObj).length === 0){
        return Promise.reject({status: 404, message: "Comment not added"})
    }
    return db.query(`Insert into comments (article_id, author, body) values ($1, $2, $3) returning article_id, author as username, body as comment_body`,
         [articleId, commentObj.username, commentObj.body])
         .then(({rows}) =>{
            return rows[0]
         })
}

function deleteCommentById(id) {
    return db.query(`Delete from comments where comment_id = $1`, [id])
}

function getCommentById(id) {
    return db.query(`Select * from comments where comment_id = $1`, [id])
    .then(({rows}) => {
        if(rows.length===0){
            return Promise.reject({status: 404, message: "Comment not found"})
        } else {
            return rows
        }
    })
}

module.exports = { readCommentsByArticleId, createCommentByArticleId, deleteCommentById, getCommentById }
const db = require('../db/connection.js')

function readCommentsByArticleId (articleId) {
    return db.query(`Select comment_id, votes, created_at, author, body as comment_body, article_id from comments where article_id = $1 order by created_at desc`,  [articleId])
}

module.exports = { readCommentsByArticleId }
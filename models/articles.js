const db = require('../db/connection.js')

function readArticles() {
    return db.query(`Select articles.article_id, articles.author, articles.title, articles.topic, 
    articles.created_at, articles.votes, articles.article_img_url, count(comments.comment_id) as comment_count
    from articles left join comments on comments.article_id = articles.article_id
    group by articles.article_id order by articles.created_at desc`)
}

module.exports = { readArticles };
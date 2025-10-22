const db = require('../db/connection.js')

function readArticles() {
    return db.query(`Select articles.article_id, articles.author, articles.title, articles.topic, 
        articles.created_at, articles.votes, articles.article_img_url, count(comments.comment_id) as comment_count
        from articles left join comments on comments.article_id = articles.article_id
        group by articles.article_id order by articles.created_at desc`)
}

function readArticlesById(id){
    console.log(id)
    return db.query(`Select author, title, article_id, body as article_body, topic, created_at, votes, article_img_url
        from articles where article_id = $1`, [id])
}

module.exports = { readArticles, readArticlesById };
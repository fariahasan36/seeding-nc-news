const db = require('../db/connection.js')

function readArticles({ sort_by = "created_at", order = "DESC" }) {
    const validSortColumns = ["created_at", "votes"];
    const validOrderOptions = ["ASC", "DESC"];
console.log(sort_by)
console.log(order)

    if(!validSortColumns.includes(sort_by) || !validOrderOptions.includes(order)){
        return Promise.reject({status: 404, message: "Invalid input"})
    }
    const query = `Select articles.article_id, articles.author, articles.title, articles.topic, 
        articles.created_at, articles.votes, articles.article_img_url, count(comments.comment_id) as comment_count
        from articles left join comments on comments.article_id = articles.article_id
        group by articles.article_id ORDER BY ${sort_by} ${order}`

    return db.query(query)
}

function readArticlesById(id) {
    return db.query(`Select author, title, article_id, body as article_body, topic, created_at, votes, article_img_url
        from articles where article_id = $1`, [id])
}

function updateArticleById(id, articleObj) {
    if(Object.keys(articleObj).length === 0){
        return Promise.reject({status: 404, message: "Article not updated"})
    }
    return db.query(`UPDATE articles SET votes = $1 WHERE article_id = $2 returning *;`, [articleObj.inc_votes, id])
}

module.exports = { readArticles, readArticlesById, updateArticleById };
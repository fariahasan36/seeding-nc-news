const db = require('../db/connection.js')

function readArticles({ sort_by = "created_at", order = "DESC", topic}) {
    const validSortColumns = ["created_at", "votes"];
    const validOrderOptions = ["ASC", "DESC"];
    console.log(typeof topic)
    const queryValue = []
    if(!validSortColumns.includes(sort_by) || !validOrderOptions.includes(order)) {
        return Promise.reject({status: 400, message: "Invalid input"})
    }
    if (topic && typeof topic !== "string" || /^[0-9]+$/.test(topic)) {
        return Promise.reject({ status: 400, message: "Invalid input" });
    }
    let query = `Select articles.article_id, articles.author, articles.title, articles.topic, 
        articles.created_at, articles.votes, articles.article_img_url, count(comments.comment_id) as comment_count
        from articles left join comments on comments.article_id = articles.article_id`
    
    if(topic) {
        query+= ` WHERE articles.topic = $1`
        queryValue.push(topic)
    }
    query += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

    return db.query(query, queryValue)
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
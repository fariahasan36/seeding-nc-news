const format = require("pg-format")
const db = require("../connection")
const {convertTimestampToDate, createLookupObj} = require("../seeds/utils")


const seed = ({ topicData, userData, articleData, commentData }) => {  
  return db.query(`DROP TABLE IF EXISTS COMMENTS;`)
  .then(()=>{
      return db.query(`DROP TABLE IF EXISTS ARTICLES`)
    })
  .then(()=>{
    return db.query(`DROP TABLE IF EXISTS topics;`)
  }).then(()=>{
      return db.query(`DROP TABLE IF EXISTS USERS`)
    }).then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug VARCHAR(150) PRIMARY KEY,
          description VARCHAR(250) NOT NULL,
          img_url VARCHAR(1000) NOT NULL
        );
      `);
    }).then(()=>{
      return db.query(`CREATE TABLE users (username VARCHAR(100) PRIMARY KEY,
         name VARCHAR(250) NOT NULL, 
         avatar_url VARCHAR(1000) NOT NULL);`)
    }).then(()=>{
      return db.query(`CREATE TABLE articles (article_id serial PRIMARY KEY,
         title VARCHAR(250) NOT NULL, 
         topic VARCHAR(250) REFERENCES topics(slug) ON DELETE CASCADE,
         author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
         body TEXT NOT NULL,
         created_at Timestamp DEFAULT CURRENT_TIMESTAMP,
         votes INT NOT NULL DEFAULT 0,
         article_img_url VARCHAR(1000));`)
    }).then(()=>{
      return db.query(`CREATE TABLE comments (comment_id serial PRIMARY KEY,
         article_id int REFERENCES articles (article_id) ON DELETE CASCADE,
         author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
         body TEXT NOT NULL,
         created_at Timestamp DEFAULT CURRENT_TIMESTAMP,
         votes INT NOT NULL DEFAULT 0);`);
    }).then(()=>{
      topicData = topicData.map((topic)=>{
      return [topic.description, topic.slug, topic.img_url];
      })
      const topicsInsertStr = format(`INSERT INTO topics (description, slug, img_url) VALUES %L;`, topicData);
    return db.query(topicsInsertStr);
  }).then(()=>{
      userData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      })
    const usersInsertStr = format(`INSERT INTO users (username, name, avatar_url) VALUES %L;`, userData);
    return db.query(usersInsertStr);
  })
  .then(()=>{
      articleData = articleData.map((article)=>{
        return [article.title, article.topic, article.author, article.body, new Date(article.created_at), article.votes, article.article_img_url];
      })
     const articleInsertStr = format(
    `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L;`, articleData);
    return db.query(articleInsertStr);
  })
  .then(() => {
        const getArticleID = format(`Select article_id, title from articles;`);
        return db.query(getArticleID);
      })
  .then(({ rows }) => {
  const lookupObj = createLookupObj(rows, 'title', 'article_id');
  commentData = commentData.map((comment) => {
      return [
      lookupObj[comment.article_title],
      comment.body,
      comment.votes, 
      comment.author,      
      new Date(comment.created_at)      
      ];  
  });
   const commentsInsertStr = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L;`, commentData);   
    return db.query(commentsInsertStr);
});

  
};
module.exports = seed;

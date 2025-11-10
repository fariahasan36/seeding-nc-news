const express = require('express');
const timeout = require('connect-timeout');
const app = express();
const { getTopics, getHello } = require('./controllers/topics.js');
const {
  getArticles,
  getArticleById,
  patchArticleByArticleId,
} = require('./controllers/articles.js');
const {
  getAllCommnetsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
} = require('./controllers/comments.js');
const { getUsers } = require('./controllers/users.js');
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require('./controllers/errors.js');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(timeout('5s'));

app.use(express.static('public'));

app.get('/', getHello);

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getAllCommnetsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticleByArticleId);

app.delete('/api/comments/:comment_id', deleteCommentByCommentId);

app.use((req, res) => {
  res.status(404).send({ message: 'Path not found' });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;

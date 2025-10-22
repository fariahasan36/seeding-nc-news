const { readCommentsByArticleId } = require('../models/comments.js')

const getAllCommnetsByArticleId = (req, res) => {
    const { article_id } = req.params

    const id = parseInt(article_id);

    if(!id) {
        return res.status(400).send({message: "Invalid article id"})
    }

    readCommentsByArticleId(id).then(({rows}) => {
        if(rows.length === 0){
            return res.status(404).send({message: "Comments not found"})
        } else {
            res.status(200).send({ comments : rows })
        }
    })
}

module.exports = { getAllCommnetsByArticleId }
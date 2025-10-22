const db = require('../db/connection.js')

function readTopics(){
    return db.query(`Select slug, description from topics`)
}

module.exports = { readTopics }
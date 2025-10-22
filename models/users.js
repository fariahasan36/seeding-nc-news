const db = require('../db/connection.js')

function readUsers() {
    return db.query(`Select username, name, avatar_url from users`)
}

module.exports = { readUsers }
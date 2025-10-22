const { readUsers } = require('../models/users.js')

const getUsers  = (req, res) => {
    readUsers().then(( {rows} ) => {
        res.status(200).send({ users: rows })
    })
} 

module.exports = { getUsers }
const format = require("pg-format")
const db = require("../connection.js")


const query = () => { 
    return db.query(`Select * from users;`)
    .then((result) =>{
        // console.log(result.rows);
    }).then(() =>{
         return db.query(`Select * from articles where topic = 'coding';`)
    })
    .then((result) =>{
        // console.log(result.rows);
    })
    .then(() =>{
         return db.query(`Select * from comments where votes < 0;`)
    })
    .then((result) =>{
        // console.log(result.rows);
    })
    .then(() =>{
         return db.query(`Select * from topics;`)
    })
    .then((result) =>{
        // console.log(result.rows);
    })
    .then(() =>{
         return db.query(`Select * from articles where author = 'grumpy19';`)
    })
    .then((result) =>{
        // console.log(result.rows);
    })
    .then(() =>{
         return db.query(`Select * from comments where votes > 10;`)
    })
    .then((result) =>{
        console.log(result.rows);
    })
    .then(() => db.end());
 }

query();
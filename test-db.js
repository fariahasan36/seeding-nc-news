const db = require("./db/connection");

db.query("SELECT NOW()")
  .then(res => {
    console.log("Connected successfully:", res.rows[0]);
    db.end();
  })
  .catch(err => {
    console.error("Connection error:", err);
    db.end();
  });

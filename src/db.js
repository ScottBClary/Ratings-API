const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
});
db.query(`USE SDC_Ratings`, (error, results, fields) => {
});
module.exports = db;

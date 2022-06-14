const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
});
db.query(`USE SDC_Ratings`, (error, results, fields) => {
  if (error) {
    console.log(error);
    console.log('there was an error');
    console.log(error.message);
  } else {
    console.log('connection succesful');
  }
});
module.exports = db;

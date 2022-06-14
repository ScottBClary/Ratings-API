const mysql = require('mysql2');
require('dotenv').config();
var db;
if (process.env.DEV === 'SERVER') {
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    multipleStatements: true,
  });
} else {
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true,
  });
}
// db.query(`USE SDC_Ratings`, (error, results, fields) => {new-password
//   if (error) {
//     console.log(error);
//     console.log('there was an error');
//     console.log(error.message);
//   } else {
//     console.log('connection succesful');
//   }
// });
module.exports = db;

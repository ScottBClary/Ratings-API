const mysql = require('mysql2');
require('dotenv').config();
var db;
console.log('Am i using a password?');
console.log(process.env.password);
console.log(process.env.DEV);
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
// db.query(`USE SDC_Ratings`, (error, results, fields) => {
//   if (error) {
//     console.log(error);
//     console.log('there was an error');
//     console.log(error.message);
//   } else {
//     console.log('connection succesful');
//   }
// });
module.exports = db;

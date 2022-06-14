const mysql = require('mysql2');
require('dotenv').config();

let db;
console.log('Am i using a password?');
console.log(process.env);
console.log(process.env.PASSWORD);
console.log(process.env.ENV);
if (process.env.ENV === 'SERVER') {
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
db.query('USE SDC_Ratings', (error, results, fields) => {
  if (error) {
    console.log(error);
    console.log('there was an error');
    console.log(error.message);
  } else {
    console.log('connection succesful');
    return 0;
  }
});
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

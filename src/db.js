const mysql = require('mysql2');
require('dotenv').config();

let db;

if (process.env.ENV === 'SERVER') {
  db = mysql.createConnection({
    host: process.env.DBIP,
    user: 'remote',
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

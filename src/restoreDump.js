const mysql = require('mysql2');

const q = 'mysql -u root SDC_Ratings < dump.sql';


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
});
db.query(q, (error, results, fields) => {
});


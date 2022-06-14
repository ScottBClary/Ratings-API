const path = require('path');
const fs = require('fs');
const db = require('./db');

const q = 'mysql -u root SDC_Ratings < dump.sql';
db.query(q, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log(result.body);
    console.log('Query run successfully');
  }
});


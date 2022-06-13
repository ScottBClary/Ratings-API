const path = require('path');
const fs = require('fs');
const db = require('./db');

const schema = fs.readFileSync(path.join(__dirname, './query.sql')).toString();
db.query(schema, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log(result.body);
    console.log('Query run successfully');
  }
});

console.log('schema created');

/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const express = require('express');
require('dotenv').config();

const app = express();
const bodyparser = require('body-parser');
const db = require('./db');
// use express static folder
// body-parser middleware use
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true,
}));
// Database connection

// db.connect((err) => {
//   if (err) {
//     console.log(`error: ${err.message}`);
//   }
//   console.log('Connected to the MySQL server.');
//   db.query('USE SDC_Ratings', (error, results, fields) => {
//     if (error) {
//       console.log(error);
//       console.log('there was an error');
//       console.log(error.message);
//     } else {
//       console.log('connection succesful');
//       return 0;
//     }
//   });
// });

// route for Home page
app.get('/', (req, res) => {
  res.send('Get request recieved for homepage, but there is no homepage');
});

/*
  GET Reviews
  @param request.body - JSON object
    {
      page - integer - Selects the page of results to return. Default 1.
      count - integer - Specifies how many results per page to return. Default 5.
      sort - text - Changes the sort order of reviews
        to be based on "newest", "helpful", "relevant"
      product_id - integer - Specifies the product for which to retrieve reviews.
    }
*/

// TODO, implement pages
app.get('/reviews', (req, res) => {
  const page = req.query.page || 0;
  const count = req.query.count || 5;
  const sort = req.query.sort;
  const product_id = req.query.product_id;
  console.log('Data in request: ');
  console.log('{');
  console.log(` page: ${page || 0}`);
  console.log(` count: ${count}`);
  console.log(` sort: ${sort}`);
  console.log(` product_id: ${product_id}`);
  console.log('}');
  // review_id, product_id, star_rating, @date, summary, body, recommend, @reported, name, email, response, helpfulnes
  var orderField;
  var orderField2;
  switch (sort) {
    case 'newest':
      orderField = 'date';
      break;
    case 'helpful':
      orderField = 'helpfulness';
      break;
    case 'relevant':
      orderField = 'date'; // I have no idea what ordering by relevant means
      break;
    default:
      orderField = 'date';
      break;
  }
  if (orderField === 'date') {
    orderField2 = 'DESC';
  } else {
    orderField2 = 'ASC';
  }
  db.query(`SELECT * FROM review where product_id = ${product_id} ORDER BY ${orderField} ${orderField2}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      const data = {};
      data.product = product_id;
      data.page = page;
      data.count = count;
      data.results = [];
      for (let i = 0; i < result.length && count; i++) {
        // let currentPage = (i+1)/(count+1) - 1;
        data.results.push(result[i]);
      }
      console.log(`result is ${Object.keys(result)}`);
      console.log(`data is ${data}`);
      res.send(data);
    }
  });
});
/*
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  SELECT star_rating, COUNT(*) FROM REVIEW where product_id=66642 GROUP BY star_rating;
  SELECT recommend, COUNT(*) FROM REVIEW where product_id=66642 GROUP BY recommend;
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}

*/
app.get('/reviews/meta', (req, res) => {
  const product_id = req.query.product_id;
  const data = {};

  // console.log('Data in request: ');
  // console.log('{');
  // console.log(` product_id: ${product_id}`);
  // console.log('}');
  //   console.log(process.env);

  //   db.query(`CREATE TEMPORARY TABLE IF NOT EXISTS p${product_id} SELECT * from everythingTogether where product_id = ${product_id};`, (err, result) => {
  //     if (err) {
  //       console.log('error making temp table');
  //       console.log(err);
  //     } else {
  //       // star ratings
  //       db.query(`select COUNT(*), star_rating from (select distinct review_id, star_rating from p${product_id}) as t1 group by star_rating;`, (err, result) => {
  //         if (err) {
  //           console.log('error getting star ratings');
  //           console.log(err);
  //         } else {
  //           data.ratings = {};
  //           for (var x of result) {
  //             data.ratings[x.star_rating] = x['COUNT(*)'];
  //           }
  //           db.query(`select COUNT(*), recommend from p${product_id} group by recommend;`, (err, result) => {
  //             if (err) {
  //               console.log('error getting recommend');
  //               console.log(err);
  //             } else {
  //               data.recommend = {};
  //               for (var x of result) {
  //                 data.recommend[x.recommend] = x['COUNT(*)'];
  //               }
  //               // data.recommended[0] = (result[1] || 0)['COUNT(*)'] || 0;
  //               // data.recommended[1] = (result[0] || 0)['COUNT(*)'] || 0;
  //               db.query(`select characteristic, avg(rating) from p${product_id} group by characteristic;`, (err, result) => {
  //                 if (err) {
  //                   console.log('error getting characteristic ratings');
  //                   console.log(err);
  //                 } else {
  //                   data.characteristic = {};
  //                   for (var x of result) {
  //                     data.characteristic[x.characteristic.replaceAll('"','')] = {value: x.value};
  //                   }
  //                   res.send(data);
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  db.query(`SELECT star_rating, COUNT(*) FROM review where product_id=${product_id} GROUP BY star_rating;`, (err, result) => {
    if (err) {
      console.log('error getting star ratings');
      res.send(err.message);
    } else {
      data.ratings = {};
      for (var x of result) {
        data.ratings[x.star_rating] = x['COUNT(*)'];
      }

      //* NEXT QUERY

      db.query(`SELECT COUNT(*), recommend FROM review where product_id=${product_id} GROUP BY recommend;`, (err, result) => {
        if (err) {
          console.log('error getting recommended');
          res.send(err);
        } else {
          data.recommended = {};
          // let num = result[`COUNT(*)`][0];
          // console.log('num is ' + num);
          // data.recommend =
          data.recommended[0] = (result[1] || 0)['COUNT(*)'] || 0;
          data.recommended[1] = (result[0] || 0)['COUNT(*)'] || 0;
        }
      });

      // We need characteristics and the name of characteristics
      db.query(`select characteristic, AVG(t2.rating) AS average from review t1 inner join characteristic_review t2 inner join characteristic t3 where t1.product_id = ${product_id} AND t2.review_id = t1.review_id AND t3.characteristic_id = t2.characteristic_id group by characteristic;`, (err, result) => {
        if (err) {
          console.log('error getting characteristic ratings');
          console.log(err);
        } else {
          console.log(result);
          data.characteristics = {};
          for (var char of result) {
            data.characteristics[char.characteristic.toString().replace(/"/g, '')] = { value: char.average };
          }
          res.send(data);
        }
      });
    }
  });
});

// res.send('Get recieved for reviews/meta');

// @type   POST
// route for post data
// -> Express Upload RestAPIs

// create connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

/** **
 *
 *
 * Other routes here....
 *
 *
 */

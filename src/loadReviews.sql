LOAD DATA LOCAL INFILE '/Users/scottclary/Downloads/dbstuff/reviews.csv' INTO TABLE review FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (review_id, product_id, star_rating, @date, summary, body, @recommend, @reported, name, email, response, helpfulness) set date = FROM_UNIXTIME(@date/1000), recommend = (SELECT IF(@recommend LIKE 'true', 1, 0)), reported = (SELECT IF (@reported LIKE 'false', 0, 1));

LOAD DATA LOCAL INFILE '/Users/scottclary/Downloads/dbstuff/characteristics.csv' INTO TABLE characteristic FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (characteristic_id,@dummy,characteristic);

CREATE INDEX product_id_index ON review (product_id);



LOAD DATA LOCAL INFILE '/Users/scottclary/Downloads/dbstuff/characteristic_reviews.csv' into TABLE char_rev_temp FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (char_rev_temp_id, characteristic_id, review_id, value);

CREATE INDEX review_id_index on characteristic_review (review_id);

LOAD DATA LOCAL INFILE '/Users/scottclary/Downloads/dbstuff/characteristics.csv' into TABLE char_temp FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (char_temp_id, product_id, name);

insert into characteristic_review (characteristic_id, review_id, rating) select characteristic_id, review_id, value from (select name, value, char_rev_temp_id, review_id from char_rev_temp inner join char_temp on char_temp.char_temp_id = char_rev_temp.characteristic_id) as t1 inner join characteristic as t2 on t1.name = t2.characteristic;


CREATE TABLE `everythingTogether` AS (SELECT t1.review_id, product_id, date, star_rating, recommend, body, summary, name, email, reported, response, helpfulness, characteristic, rating FROM REVIEW as t1 left join characteristic_review as t2 on t1.review_id = t2.review_id left join characteristic as t3 on t3.characteristic_id = t2.characteristic_id);

CREATE INDEX product_id_index ON everythingTogether (product_id);

-- CREATE INDEX review_id_index on everythingTogether (review_id);

-- CREATE INDEX recommend_index on everythingTogether (recommend)
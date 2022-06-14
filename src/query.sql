-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'review'
--
-- ---
DROP DATABASE SDC_Ratings;

CREATE DATABASE SDC_Ratings;

USE SDC_Ratings;

DROP TABLE IF EXISTS `review`;




CREATE TABLE `review` (
  `review_id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NULL DEFAULT NULL,
  `date` DATETIME NOT NULL,
  `star_rating` INTEGER NOT NULL,
  `recommend` BOOLEAN NOT NULL DEFAULT FALSE,
  `body` MEDIUMTEXT NULL DEFAULT NULL,
  `summary` MEDIUMTEXT NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  `email` MEDIUMTEXT NULL,
  `reported` BOOLEAN NOT NULL default FALSE,
  `response` MEDIUMTEXT NULL,
  `helpfulness` INTEGER NULL default 0,
  PRIMARY KEY (`review_id`)
);


-- ---
-- Table 'characteristic'
--
-- ---
DROP TABLE IF EXISTS `char_temp`;

CREATE TABLE `char_temp` (
  `char_temp_id` INTEGER NOT NULL,
  `product_id` INTEGER NOT NULL,
  `name` VARCHAR(20),
  PRIMARY KEY (`char_temp_id`)
);

DROP TABLE IF EXISTS `char_rev_temp`;

CREATE TABLE `char_rev_temp` (
  `char_rev_temp_id` INTEGER NOT NULL,
  `characteristic_id` INTEGER NOT NULL,
  `review_id` INTEGER NOT NULL,
  `value` INTEGER NOT NULL,
  PRIMARY KEY (`char_rev_temp_id`)
);
DROP TABLE IF EXISTS `characteristic`;

CREATE TABLE `characteristic` (
  `characteristic_id` INTEGER NOT NULL AUTO_INCREMENT,
  `characteristic` VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (`characteristic_id`)
);

-- ---
-- Table 'characteristic_review'
--
-- ---

DROP TABLE IF EXISTS `characteristic_review`;

CREATE TABLE `characteristic_review` (
  `characteristic_id` INTEGER NOT NULL AUTO_INCREMENT,
  `review_id` INTEGER NOT NULL,
  `rating` INTEGER NOT NULL,
  PRIMARY KEY (`characteristic_id`, `review_id`)
);



-- ---
-- Table 'product_characteristic'
--
-- ---




-- ---
-- Foreign Keys
-- ---
ALTER TABLE `characteristic_review` ADD FOREIGN KEY (review_id) REFERENCES `review` (`review_id`);
ALTER TABLE `characteristic_review` ADD FOREIGN KEY (characteristic_id) REFERENCES `characteristic` (`characteristic_id`);
-- ---
-- Table Properties
-- ---

-- ALTER TABLE `review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristic` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristic_review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `product_characteristic` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `review` (`review_id`,`product_id`,`date`,`star_rating`,`recommend`,`body`,`summary`,`name`,`email`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `characteristic` (`characteristic_id`,`characteristic`) VALUES
-- ('','');
-- INSERT INTO `characteristic_review` (`characteristic_id`,`review_id`,`rating`) VALUES
-- ('','','');
-- INSERT INTO `product` (`product_id`) VALUES
-- ('');
-- INSERT INTO `product_characteristic` (`product_id`,`characteristic_id`) VALUES
-- ('','');
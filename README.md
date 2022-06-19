# Ratings-API


Create a db called SDC_Ratings


To create database, manually copy+paste each command from loadReviews.sql. This sql file is not supposed to actually be ran, it is just a holder for commands.
npm run db will !!!delete current tables!!! and then create a new one with schemas
npm run server-dev will start the server.


# Installing mysql on EC2 instance
sudo apt update

Then install the mysql-server package:

sudo apt install mysql-server

Ensure that the server is running using the systemctl start command:

sudo systemctl start mysql.service

# Changing root password

sudo mysql

flush privileges -- not sure what this does

use mysql

ALTER USER  'root'@'localhost' IDENTIFIED BY 'the-new-password';
https://devanswers.co/how-to-reset-mysql-root-password-ubuntu/

# Creating dump on local

mysqldump -u root SDC_Ratings > dump.sql

# Sending dump to EC2

scp -i scottkey.pem dump.sql  ec2-18-224-214-220.us-east-2.compute.amazonaws.com:~/home/ubuntu

# Creating database on EC2 from dump
mysql -u root -p SDC_Ratings < dump.sql  --should have a password for root by now

# Creating database from dump in one step
mysql -u remote -h <serverip> -p SDC_Ratings < dump.sql

When you are using SQL server remotely, make a new user with password.
Grant privileges/Flush privileges
Restart server

https://www.digitalocean.com/community/tutorials/how-to-allow-remote-access-to-mysql




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

# Nginx config file (example)

user www-data;
worker_processes auto;
worker_rlimit_nofile 65536;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
        worker_connections 65536;
        use epoll;
        multi_accept on;
}
http {
 upstream SDC {
    least_conn;
    server ec2-3-15-210-69.us-east-2.compute.amazonaws.com;
    server ec2-3-129-10-163.us-east-2.compute.amazonaws.com;
    server ec2-18-119-97-181.us-east-2.compute.amazonaws.com;
    server ec2-3-22-175-5.us-east-2.compute.amazonaws.com;
    keepalive 8;
    keepalive_timeout 65;
    #keepalive_requests 200;
  }
  server {
    listen 3000 default_server;
    listen [::]:3000 default_server;
    location / {
      proxy_pass http://SDC;
      proxy_http_version 1.1;
      proxy_set_header   “Connection” “”;
    }
    proxy_cache cache;
    proxy_cache_valid any 10s;
    proxy_cache_use_stale updating;
    proxy_cache_lock on;
  }
        ##
        # Basic Settings
        ##
        #keepalive_requests: 500;
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        open_file_cache max=200000 inactive=20s;
        open_file_cache_valid 30s;
        open_file_cache_min_uses 2;
        open_file_cache_errors on;
        types_hash_max_size 2048;
        proxy_cache_path /tmp/cache keys_zone=cache:10m levels=1:2 inactive=600s max_size=100m;
        # server_tokens off;
        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        ##
        # SSL Settings
        ##
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        ##
        # Logging Settings
        ##
        access_log off;
        error_log /var/log/nginx/error.log;
        ##
        # Gzip Settings
        ##
        gzip off;
        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
        ##
        # Virtual Host Configs
        ##
        include /etc/nginx/conf.d/*.conf;
         proxy_send_timeout 180s;
         proxy_read_timeout 180s;
         fastcgi_send_timeout 180s;
         fastcgi_read_timeout 180s;
        #include /etc/nginx/sites-enabled/*;
}




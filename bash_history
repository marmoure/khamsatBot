    2  sudo apt-get update
    7  curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
   10  sudo bash nodesource_setup.sh
   11  sudo apt-get install -y nodejs
   13  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   14  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   16  sudo apt update
   17  sudo apt install yarn

   45  git clone https://github.com/marmoure/coolAsciiFaces.git
   46  cd coolAsciiFaces/
   47  yarn install
   52  yarn global add pm2
   54  pm2 start app.js
/** if you wanna set up ssl certificate **//
   60  apt install nginx
   65  vim /etc/nginx/sites-available/default
   69  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
   70  sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
   71  vim /etc/nginx/sites-available/default
   72  sudo nginx -t
   73  sudo systemctl restart nginx
use certbot
install using snap


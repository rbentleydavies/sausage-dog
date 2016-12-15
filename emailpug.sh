cd /home/tc/sausage-dog
date | tee /home/tc/sausage-dog/server.log
git pull https://github.com/rbentleydavies/sausage-dog.git | tee -a /home/tc/sausage-dog/server.log
npm install | tee -a /home/tc/sausage-dog/server.log
npm run build | tee -a /home/tc/sausage-dog/server.log
npm start -s | tee -a /home/tc/sausage-dog/server.log &

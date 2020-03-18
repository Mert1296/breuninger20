FROM node:13

RUN git clone https://github.com/Mert1296/breuninger20 /home/node/breuninger \
    && cd /home/node/breuninger \
    && npm install
CMD node /home/node/breuninger/app.js
EXPOSE 8081

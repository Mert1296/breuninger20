FROM node:13

RUN git clone https://{2e3860d184b54e7a02986a7a1da299129c0c40bb}:@github.com/Mert1296/breininger20.git /home/node/ \
    && cd /home/node/breuninger \
    && npm install
CMD node /home/node/breuninger/app.js
EXPOSE 8081

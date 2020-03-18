FROM node:13

RUN cd /home \
    && mkdir breuni \
    && git clone https://github.com/Mert1296/breuninger20 /home/breuni/ \
    && cd /home/breuni/breuninger \
    && npm install
CMD node /home/breuni/breuninger/app.js
EXPOSE 8081

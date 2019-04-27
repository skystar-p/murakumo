FROM node:11-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY main.js ./

CMD npm start

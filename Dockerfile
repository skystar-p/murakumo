FROM buildkite/puppeteer:v1.15.0

WORKDIR /app

COPY package.json ./
COPY main.js ./

CMD npm start

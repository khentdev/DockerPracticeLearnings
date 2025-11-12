FROM node:24 AS dev
WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install

COPY ./src ./src

CMD [ "npm","run","dev" ]
FROM node:18.16.0-alpine3.18 AS development

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build
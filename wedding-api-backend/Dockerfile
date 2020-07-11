FROM node:latest

LABEL "com.transfonum.mariage"="mariage-api"
LABEL version="0.0.1-dev"

WORKDIR /usr/app

COPY ./dist /usr/app/dist
COPY ./ /usr/app


ENV PORT 3000

RUN npm install
EXPOSE $PORT

ENTRYPOINT ["node","dist/main.js"]

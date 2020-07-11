FROM node:latest

WORKDIR /usr/app

COPY ./dist /usr/app/dist

LABEL "com.transfonum.mariage"="mariage"
LABEL version="0.0.1-dev"

ENV PORT 80

EXPOSE $PORT

ENTRYPOINT ["node","dist/server/main.js"]

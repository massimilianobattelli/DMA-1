FROM node:18-buster

WORKDIR /usr/src/server

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

EXPOSE 3000

CMD [ "npm", "run", "start" ]

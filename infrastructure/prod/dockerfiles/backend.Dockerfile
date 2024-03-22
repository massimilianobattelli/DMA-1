FROM node:18-buster


WORKDIR /usr/src/server


COPY ./backend/package*.json ./


RUN npm install


COPY ./backend .


EXPOSE 3001


CMD [ "npx", "ts-node", "server.ts" ]

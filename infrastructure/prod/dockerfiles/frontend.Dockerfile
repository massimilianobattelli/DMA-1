FROM node:18-buster

# Create server directory
WORKDIR /usr/src/server
# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./frontend/package*.json ./
# RUN npm cache clean --force
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle server source
COPY ./frontend .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
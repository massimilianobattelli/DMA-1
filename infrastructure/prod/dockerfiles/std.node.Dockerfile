FROM node:18-buster

ARG SERVICE_PATH
ARG SERVICE_PORT

# Create server directory
WORKDIR /usr/src/server
# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY $SERVICE_PATH/package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle server source
COPY $SERVICE_PATH .

EXPOSE $SERVICE_PORT

# CMD [ "ls", "-la", "/usr/src/server/src" ]
#CMD [ "sh", "-c", "if [ \"$SERVICE_PATH\" = \"./frontend\" ]; then npm run start; else npx ts-node server.ts; fi" ]
CMD [ "sh", "-c", "if [ \"${SERVICE_PATH}\" = \"./frontend\" ]; then npm run start; else npx ts-node server.ts; fi" ]

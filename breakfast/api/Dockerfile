ARG SERVER_PORT=3000
FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN nest build
COPY *.env ./dist/

ENV NODE_ENV=development

WORKDIR /usr/app/dist

EXPOSE $SERVER_PORT

CMD node ../node_modules/typeorm/cli.js migration:run && node main
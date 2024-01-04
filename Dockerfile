FROM node:20.10.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

CMD ["node", "src/index.js"]

CMD [ "yarn", "start-web:prod" ]

EXPOSE 3000
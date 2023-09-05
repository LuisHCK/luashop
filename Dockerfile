FROM node:18-alpine

RUN apk --no-cache add --virtual builds-deps build-base python3

WORKDIR /opt/app

COPY package*.json .
COPY .env .env

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]

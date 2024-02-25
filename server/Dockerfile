FROM node:18-alpine3.17

WORKDIR /app

COPY ./server/package*.json ./
COPY ./server/tsconfig*.json ./

RUN npm install --only=dev

EXPOSE 3000
CMD ["npm","run","start:dev"]
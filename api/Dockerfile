FROM node:10.10.0

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000:4000
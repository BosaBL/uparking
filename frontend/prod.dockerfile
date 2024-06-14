FROM node:20.14-alpine AS builder
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /var/www/csep/html

COPY  --from=builder /app/buildd .

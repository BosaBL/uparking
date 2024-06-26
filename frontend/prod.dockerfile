FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
RUN pnpm install

COPY . .
RUN pnpm run build

FROM nginx:stable-alpine
WORKDIR /var/www/csep/html

COPY  --from=builder /app/buildd .

FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]

# Use an official Node.js 18.x runtime as a parent image
FROM node:18.18

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]

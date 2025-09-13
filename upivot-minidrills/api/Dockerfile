FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production || npm i --production
COPY . .
CMD ["node","src/server.js"]

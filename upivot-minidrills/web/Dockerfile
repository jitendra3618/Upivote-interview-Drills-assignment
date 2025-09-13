FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci || npm install
COPY . .
CMD ["npm","run","dev"]

FROM node:16.15.1-alpine

WORKDIR /app
EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . ./

RUN npm run build
CMD ["node","build"]

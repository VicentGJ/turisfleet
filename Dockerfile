FROM node:16.15.1-alpine

WORKDIR /app
ENV PORT=5173
EXPOSE 5173

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . ./

RUN npm run build
CMD ["node","build"]

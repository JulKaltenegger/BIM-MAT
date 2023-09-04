FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 8090
CMD [ "node", "dist/main.js" ]
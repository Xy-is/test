FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "npm run migration:run && npm run start"]


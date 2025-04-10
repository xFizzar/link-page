FROM node:23-alpine3.21

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["ng", "server", "--host", "0.0.0.0"]

FROM node:22-alpine

WORKDIR /app

COPY . .

ENV REACT_APP_BACKEND=/api

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]

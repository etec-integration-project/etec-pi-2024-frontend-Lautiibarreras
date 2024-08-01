FROM node:20-alpine

WORKDIR /app

COPY . /app

ENV REACT_APP_BACKEND=/api

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
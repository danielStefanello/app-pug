FROM node:12.16.2

WORKDIR /app

RUN apt update && apt upgrade -y

RUN yarn

COPY . /app

EXPOSE 3000

CMD [ "yarn", "dev" ]

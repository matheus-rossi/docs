FROM node:18-bullseye

COPY . /app

WORKDIR /app

RUN yarn init -y

RUN yarn add -D vitepress vue

CMD [ "vitepress", "dev" , "docs"] 

EXPOSE 5173
FROM node:8

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3999 

CMD ["npm","start"]






FROM node:16

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
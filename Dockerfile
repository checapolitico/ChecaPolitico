FROM node:latest

COPY . /opt/checapolitico

WORKDIR /opt/checapolitico
RUN npm install -g yarn
RUN yarn install

EXPOSE 8081

CMD npm start
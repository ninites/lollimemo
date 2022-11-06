FROM node:16-alpine as node
RUN mkdir -p /app
WORKDIR /app/client

COPY . /app/client

RUN npm install -g @angular/cli @angular-devkit/build-angular 
RUN cd /app/client
RUN npm install

EXPOSE 4200 49153

CMD ["npm", "start"]
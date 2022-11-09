FROM node:16-alpine as node

RUN mkdir -p /app
WORKDIR /app/server
COPY . /app/server
RUN cd /app/server
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
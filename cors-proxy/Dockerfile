FROM node:16-alpine as node

RUN mkdir -p /app
WORKDIR /app/cors-proxy
COPY . /app/cors-proxy
RUN cd /app/cors-proxy
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
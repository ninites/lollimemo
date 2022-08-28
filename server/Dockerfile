FROM node:16-alpine as node
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
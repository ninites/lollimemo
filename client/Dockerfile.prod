FROM node:16-alpine as build

RUN mkdir -p /app
WORKDIR /app/client
COPY . /app/client
RUN cd /app/client
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli
RUN ng build --configuration=production

FROM nginx:1.15.8
EXPOSE 80
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/client/dist/quizz /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
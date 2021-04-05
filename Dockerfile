FROM nginx:1.17.9-alpine

WORKDIR /opt/front

COPY ./build /opt/front

CMD ["nginx", "-g", "daemon off;"]

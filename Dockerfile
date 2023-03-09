FROM alpine:latest
RUN apk add --update nodejs npm
WORKDIR /app/cms-auth
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE  8080
CMD ["node", "index.js"]
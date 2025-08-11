FROM node:22.18.0-alpine3.22 as base
WORKDIR /app

FROM base as deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as build
COPY . ./
RUN yarn build

FROM nginx:1.29.0-alpine3.22
COPY --from=build /app/build/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

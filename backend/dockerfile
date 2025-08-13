FROM node:22.18.0-alpine3.22 as base
WORKDIR /app


FROM base as dev-deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base as build
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn test
RUN yarn build


FROM base as prod-deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production


FROM base as prod
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

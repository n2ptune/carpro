# install

ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION} as base

ARG PORT=40509

ENV NODE_ENV=production

WORKDIR /app

# build

FROM base as builder

COPY --link package*.json .

RUN npm install

COPY --link . .

RUN npm run build

# run

FROM base as runner

ENV PORT=$PORT

COPY --from=builder /app/.output /app/.output

CMD ["node", ".output/server/index.mjs"]
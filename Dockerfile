# install

ARG NODE_VERSION=22-alpine
ARG PORT=20500

FROM node:${NODE_VERSION} as base

ENV NODE_ENV=production

WORKDIR /app

# build

FROM base as builder

COPY --link package*.json ./

RUN npm install

COPY --link . ./

RUN npm run build

# run

FROM base as runner

ENV PORT=$PORT

EXPOSE ${PORT}

COPY --from=builder /app/.output /app/.output/

CMD ["node", "/app/.output/server/index.mjs"]
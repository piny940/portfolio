# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

################################################################################
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app


################################################################################
FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile

################################################################################
FROM deps as build

COPY . .
RUN yarn run build

################################################################################
FROM base as final

ENV NODE_ENV production
RUN chown node:node -R /usr/src/app
RUN apk add curl

USER node

COPY package.json .

COPY --from=build /usr/src/app/out/main.js ./out/main.js

CMD node out/main.js

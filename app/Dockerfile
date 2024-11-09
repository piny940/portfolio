# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

################################################################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

################################################################################
FROM base AS build

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

ARG BACKEND_HOST
ENV BACKEND_HOST=${BACKEND_HOST}

RUN pnpm run build

################################################################################
FROM base AS final

ENV NODE_ENV=production

COPY package.json .

COPY documents ./documents
COPY --from=build /usr/src/app/.next ./.next
COPY ./next.config.js .
COPY ./public ./public

RUN chown node:node -R /usr/src/app

CMD [ "pnpm", "start" ]

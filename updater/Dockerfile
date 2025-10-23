# syntax=docker/dockerfile:1

################################################################################
FROM node:22.21.0-alpine AS base

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

################################################################################
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

################################################################################
FROM deps AS build

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

################################################################################
FROM base AS final

ENV NODE_ENV production
RUN chown node:node -R /usr/src/app

USER node

COPY package.json .

COPY --from=build /usr/src/app/out/main.js ./out/main.js

CMD node out/main.js

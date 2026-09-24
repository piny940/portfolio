#!/bin/sh
set -e
docker build -t portfolio-playwright -f docker/Dockerfile.playwright .
docker run --ipc=host \
  -v "$(pwd)":/workdir -v portfolio-playwright-node-modules:/workdir/node_modules \
  portfolio-playwright \
  sh -c "pnpm install --frozen-lockfile && pnpm build && pnpm exec playwright test $*"

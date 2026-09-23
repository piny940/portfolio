#!/bin/sh
set -e
docker build -t portfolio-playwright -f __tests__/e2e/Dockerfile .
docker run --ipc=host \
  -v "$(pwd)":/workdir -v portfolio-playwright-node-modules:/workdir/node_modules \
  portfolio-playwright \
  sh -c "pnpm install --frozen-lockfile && pnpm build && pnpm exec playwright test $*"

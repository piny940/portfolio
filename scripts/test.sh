#!/bin/sh
set -e

pnpm exec playwright install
pnpm test:jest
pnpm test:e2e

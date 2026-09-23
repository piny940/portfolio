#!/bin/sh
set -e

pnpm test:jest
pnpm test:e2e

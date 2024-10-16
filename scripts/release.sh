#!/bin/bash

set -e

# Restore all git changes
git restore -s@ -SW  -- packages

# Build all once to ensure things are nice
pnpm build

# Release packages
TAG="latest"

pnpm publish --access public --no-git-checks --tag $TAG

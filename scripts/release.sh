#!/bin/bash

set -e

# Restore all git changes
git restore -s@ -SW  -- packages

# Build all once to ensure things are nice
pnpm build

# use absolute urls for better rendering on npm
sed -i.bak 's/\.\/\.github\/assets/https:\/\/github.com\/xingxing-collective\/neplayer\/tree\/main\/\.github\/assets/g' README.md

# Release packages
TAG="latest"

# Print current directory and check for LICENSE and README.md
echo "Current directory: $(pwd)"
echo "Checking for LICENSE and README.md files..."
ls ../../

# Copy LICENSE and README.md
cp ../../LICENSE .
cp ../../README.md .

pnpm publish --access public --no-git-checks --tag $TAG

mv README.md.bak README.md

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

pnpm publish --access public --no-git-checks --tag $TAG


# Restore README.md from backup
if [ -f README.md.bak ]; then
    mv README.md.bak README.md
    echo "Restored README.md from backup."
else
    echo "No backup found for README.md."
fi

# Optionally remove the .bak file
if [ -f README.md.bak ]; then
    rm README.md.bak
    echo "Removed backup file README.md.bak."
fi
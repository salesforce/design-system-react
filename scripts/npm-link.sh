#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

./node_modules/.bin/babel-node scripts/inline-icons.js

echo "# Building design-system-react"
echo "## Preparing the .tmp directory"

rm -rf .tmp/
rm -rf .tmp-amd/
rm -rf .tmp-commonjs/
rm -rf .tmp-es/
mkdir -p .tmp/

echo "## Running webpack"

BUILD="./node_modules/.bin/webpack --config webpack.config.dist.js"

eval $BUILD
eval "MINIFY=1 $BUILD"

echo "## Cloning additional files"

cp .gitignore .tmp/.gitignore
cp LICENSE .tmp/LICENSE
cp CONTRIBUTING.md .tmp/CONTRIBUTING.md
cp package.json .tmp/package.json
cp README-dist.md .tmp/README.md

echo "## Running js steps"

./node_modules/.bin/babel-node scripts/dist.js

echo "## Copying the components"

cp -r .tmp .tmp-es
rm -rf .tmp/

cp -r components .tmp-es/components
cp -r styles .tmp-es/styles
cp -r icons .tmp-es/icons
cp -r utilities .tmp-es/utilities
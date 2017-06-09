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
cp LICENSE.txt .tmp/LICENSE.txt
cp CONTRIBUTING.md .tmp/CONTRIBUTING.md
cp package.json .tmp/package.json
cp README-dist.md .tmp/README.md

echo "## Running js steps"

./node_modules/.bin/babel-node scripts/dist.js

echo "## Copying the components"

cp -r .tmp .tmp-amd
cp -r .tmp .tmp-commonjs
cp -r .tmp .tmp-es
rm -rf .tmp/

cp -r components .tmp-es/components
cp -r styles .tmp-es/styles
cp -r icons .tmp-es/icons
cp -r utilities .tmp-es/utilities
cp -r examples .tmp-es/examples

echo "## Transpiling with Babel"

NODE_ENV=amd ./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/components --out-dir .tmp-amd/components
cp -r styles .tmp-amd/styles
./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/icons --out-dir .tmp-amd/icons
NODE_ENV=amd ./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/utilities --out-dir .tmp-amd/utilities


NODE_ENV=commonjs ./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/components --out-dir .tmp-commonjs/components
cp -r styles .tmp-commonjs/styles
./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/icons --out-dir .tmp-commonjs/icons
NODE_ENV=commonjs ./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/utilities --out-dir .tmp-commonjs/utilities

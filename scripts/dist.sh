#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

./node_modules/.bin/babel-node scripts/inline-icons.js --plugins transform-es2015-modules-commonjs

echo "# Building design-system-react"
echo "## Preparing the .tmp directory"

rm -rf .tmp/
rm -rf .tmp-amd/
rm -rf .tmp-commonjs/
rm -rf .tmp-es/
rm -rf .tmp-npm/
mkdir -p .tmp/

echo "## Running webpack"

BUILD="./node_modules/.bin/webpack --config webpack.config.dist.js"

eval $BUILD
eval "MINIFY=true $BUILD"

eval "INCLUDE_ICONS=true $BUILD"
eval "INCLUDE_ICONS=true MINIFY=true $BUILD"

echo "## Cloning additional files"

cp .gitignore .tmp/.gitignore
cp LICENSE.txt .tmp/LICENSE.txt
cp package.json .tmp/package.json
cp docs/README-dist.md .tmp/README.md

echo "## Running JS steps"

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

echo "## Transpiling with Babel"

# AMD module transpilation
NODE_ENV=amd \
./node_modules/.bin/babel \
    .tmp-es/components \
    --plugins transform-es2015-modules-amd \
    --out-dir .tmp-amd/components \
    --ignore site-stories.js,__docs__,__examples__,__tests__

cp -r styles .tmp-amd/styles

./node_modules/.bin/babel \
    .tmp-es/icons \
    --plugins transform-es2015-modules-amd \
    --out-dir .tmp-amd/icons

NODE_ENV=amd \
./node_modules/.bin/babel \
    .tmp-es/utilities \
    --plugins transform-es2015-modules-amd \
    --out-dir .tmp-amd/utilities

# CommonJS module transpilation
NODE_ENV=commonjs \
./node_modules/.bin/babel \
    .tmp-es/components \
    --plugins transform-es2015-modules-commonjs \
    --out-dir .tmp-commonjs/components \
    --ignore site-stories.js,__docs__,__examples__,__tests__

cp -r styles .tmp-commonjs/styles

./node_modules/.bin/babel \
    .tmp-es/icons \
    --plugins transform-es2015-modules-commonjs \
    --out-dir .tmp-commonjs/icons

NODE_ENV=commonjs \
./node_modules/.bin/babel \
    .tmp-es/utilities \
    --plugins transform-es2015-modules-commonjs \
    --out-dir .tmp-commonjs/utilities

# NPM module structure
# * `[root]/design-system-react.js` (UMD bundle, backwards compatible)
# * `[root]/components/**` ES6 source code. To use: `import Button from 'design-system-react/components/button'`. This will need transpiler plugins.
# * `lib/**` commonjs transpiled (no babel presets needed, linked to from `package.main`, this would be backwards compatible as long as you didn't want real ES6 modules, this would also be compatible with `create-react-app` See https://github.com/facebookincubator/create-react-app/issues/1125 which doesn't transpile `node_modules` ). To use: `import { Button } from 'design-system-react'`.
cp -r .tmp-es .tmp-npm
cp -r .tmp-commonjs .tmp-npm/lib

./node_modules/.bin/babel-node scripts/npm-transform.js --plugins transform-es2015-modules-commonjs

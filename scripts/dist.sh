#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

# NOTE: eventually use "babel.config.js" instead of setting --config-path.
# Use of --config-path is ok for now because babel-cli is searching for "babel.config.js"
# and not falling back to ".babelrc" at all, so it doesn't double-load by default.
# See:
# https://babeljs.io/docs/en/configuration#what-s-your-use-case
# https://babeljs.io/docs/en/options#configfile

npx babel-node scripts/inline-icons.js \
    --plugins @babel/plugin-transform-modules-commonjs

echo "# Building design-system-react"
echo "## Preparing the .tmp directory"

rm -rf .tmp/
# Uncomment this line if you need to build an AMD/Require.js module
# rm -rf .tmp-amd/
rm -rf .tmp-commonjs/
# Source code
rm -rf .tmp-es/
# ES6 modules
rm -rf .tmp-esm/
# All the formats!!!
rm -rf .tmp-npm/
mkdir -p .tmp/

echo "## Running webpack"

BUILD="npx webpack --config webpack.config.dist.js"

eval $BUILD
eval "MINIFY=true $BUILD"

eval "INCLUDE_ICONS=true $BUILD"
eval "INCLUDE_ICONS=true MINIFY=true $BUILD"

echo "## Cloning additional files"

cp .gitignore .tmp/.gitignore
cp LICENSE.txt .tmp/LICENSE.txt
cp package.json .tmp/package.json
cp -r docs .tmp/docs
cp docs/README-dist.md .tmp/README.md

echo "## Running JS steps"

npx babel-node scripts/dist.js \
    --plugins @babel/plugin-transform-modules-commonjs

echo "## Copying the components"

# Uncomment this line if you need to build an AMD/Require.js module
# cp -r .tmp .tmp-amd
cp -r .tmp .tmp-commonjs
cp -r .tmp .tmp-es
rm -rf .tmp/

# Copy source code
cp -r assets .tmp-es/assets
cp -r components .tmp-es/components
cp -r styles .tmp-es/styles
cp -r icons .tmp-es/icons
cp -r utilities .tmp-es/utilities

echo "## Transpiling with Babel"

# Uncomment these lines if you need to build an AMD/Require.js module
# AMD module transpilation
# NODE_ENV=amd \
# ./node_modules/.bin/babel \
#     .tmp-es/components \
#	  --config-file ./.babelrc \
#     --plugins @babel/plugin-transform-modules-amd \
#     --out-dir .tmp-amd/components \
#     --ignore site-stories.js,__docs__,__examples__,__tests__

# cp -r styles .tmp-amd/styles

# ./node_modules/.bin/babel \
#     .tmp-es/icons \
#	  --config-file ./.babelrc \
#     --plugins @babel/plugin-transform-modules-amd \
#     --out-dir .tmp-amd/icons

# NODE_ENV=amd \
# ./node_modules/.bin/babel \
#     .tmp-es/utilities \
#	  --config-file ./.babelrc \
#     --plugins @babel/plugin-transform-modules-amd \
#     --out-dir .tmp-amd/utilities

# CommonJS module transpilation
NODE_ENV=commonjs \
npx babel \
    .tmp-es/components \
    --config-file ./.babelrc \
    --out-dir .tmp-commonjs/components \
    --copy-files \
    --plugins @babel/plugin-transform-modules-commonjs \
    --ignore site-stories.js,__docs__,__examples__,__tests__

cp -r assets .tmp-commonjs/assets
cp -r styles .tmp-commonjs/styles

npx babel \
    .tmp-es/icons \
    --config-file ./.babelrc \
    --out-dir .tmp-commonjs/icons \
    --copy-files \
    --plugins @babel/plugin-transform-modules-commonjs

NODE_ENV=commonjs \
npx babel \
    .tmp-es/utilities \
    --config-file ./.babelrc \
    --out-dir .tmp-commonjs/utilities \
    --copy-files \
    --plugins @babel/plugin-transform-modules-commonjs

# ES6 module transpilation
NODE_ENV=esm \
npx babel \
    .tmp-es/components \
    --config-file ./.babelrc \
    --out-dir .tmp-esm/components \
    --copy-files \
    --source-maps \
    --ignore site-stories.js,__docs__,__examples__,__tests__

cp -r assets .tmp-esm/assets

cp -r styles .tmp-esm/styles

cp -r icons .tmp-esm/icons

NODE_ENV=esm \
npx babel \
    .tmp-es/utilities \
    --config-file ./.babelrc \
    --out-dir .tmp-esm/utilities \
    --copy-files \
    --source-maps

NODE_ENV=esm \
npx babel \
    .tmp-es/icons \
    --config-file ./.babelrc \
    --out-dir .tmp-esm/icons \
    --copy-files

# NPM module structure
# You module bundler will decide whether to use `module` or `lib` as an entry point.
# * `/design-system-react.js` (UMD bundle, backwards compatible, all the things! -- DONT' USE in production.)
# * `/components/**` ES6 source code. To use: `import Button from 'design-system-react/components/button'`. This will need transpiler plugins.
# * `module/**` ES6 modules transpiled (babel-env preset needed, linked to from `package.module`, To use: `import { Button } from 'design-system-react'`.
# * `lib/**` commonjs transpiled (no babel presets needed, linked to from `package.main`). To use: `import { Button } from 'design-system-react'`.
cp -r .tmp-es .tmp-npm
cp -r .tmp-commonjs .tmp-npm/lib
cp -r .tmp-esm .tmp-npm/module

# Remove browser UMD bundle from commonjs folder, since the files already exists in the root folder
rm .tmp-npm/lib/*.map
rm .tmp-npm/lib/*.js

npx babel-node scripts/npm-transform.js \
    --plugins @babel/plugin-transform-modules-commonjs

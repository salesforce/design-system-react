#!/bin/bash

set -o errexit # Exit on error

export GIT_VERSION=`node scripts/helpers/version.js`
echo "DSF version: <$GIT_VERSION>"

echo "Cleaning `build/`..."
echo "FIND A REPLACEMENT FOR grunt kill-webpack-build"

echo "Running webpack build..."
./node_modules/.bin/webpack --config webpack.config.js


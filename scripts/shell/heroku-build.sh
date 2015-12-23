#!/bin/bash
 
set -o errexit # Exit on error

export GIT_VERSION=`node scripts/helpers/version.js`
echo "DSF version: <$GIT_VERSION>"

./node_modules/.bin/webpack --config webpack.heroku.config.js
grunt build-www

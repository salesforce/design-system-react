#!/bin/bash
 
set -o errexit # Exit on error

./node_modules/.bin/webpack --config webpack.heroku.config.js
./bin/generate-docs.sh
#!/bin/bash
 
set -o errexit # Exit on error

./node_modules/.bin/webpack --config webpack.heroku.config.js
./node_modules/.bin/docco -t docs/templates/docco.jst -c public/assets/docco/docco.css -o public/docs {src/**,src/**/**,src/**/**/**}/*.js
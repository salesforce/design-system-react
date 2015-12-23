#!/bin/bash

./node_modules/.bin/docco -t docs/templates/docco.jst -c site/assets/docco/docco.css -o site/docs {src/**,src/**/**,src/**/**/**}/*.js
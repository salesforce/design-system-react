#!/bin/bash

./node_modules/.bin/docco -t docs/templates/docco.jst -c docs/templates/docco.css -o public/documentation {src/**,src/**/**,src/**/**/**}/*.js
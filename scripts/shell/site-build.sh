#!/bin/bash

set -o errexit # Exit on error

export GIT_VERSION=`node scripts/helpers/version.js`
echo "DSF version: <$GIT_VERSION>"

NUM_ARGS=$#
ADD_WATCH_FLAG=false
GENERATE_DOCS=true
FLAG=




# parse arguments
if (( NUM_ARGS > 0 && NUM_ARGS < 3 )); then
	until [ -z "$1" ]; do
		[ "$1" == "--watch" ] && ADD_WATCH_FLAG=true && FLAG=$1
		[ "$1" == "--no-docs" ]  && GENERATE_DOCS=true
		shift
	done
fi

./node_modules/.bin/webpack --config webpack.config.site-build.js $FLAG


if [ ! $GENERATE_DOCS ]; then
	./scripts/shell/generate-docs.sh
fi

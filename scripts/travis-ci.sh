#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

source ./scripts/test.sh

# Prettier
RUN_PRETTIER_CODE='npm run prettier-eslint:code:no-fix'
SKIP_RUN_PRETTIER_CODE=false
# ESlint tests on files within components and utilities folders. Doc examples and tests are currently excluded.
RUN_PRETTIER_DOCS='npm run prettier:docs:no-fix'
SKIP_RUN_PRETTIER_DOCS=false
# Mocha framework tests that focus on user interaction
START_KARMA='node_modules/.bin/karma start --single-run'
SKIP_START_KARMA=false
# Jest markup & image snapshot tests
SNAPSHOT_TESTS='npm run snapshot-test'
SKIP_SNAPSHOT_TESTS=false
# React DocGen library build of source comments into a JSON file for documentation site
DOCGEN='npm run build-docs'
SKIP_DOCGEN=false

numArgs=$#
# parse arguments
if (( numArgs >= 0 )); then
	until [ -z "$1" ]; do
		[ "$1" == "--skip-format" ] ||
		[ "$1" == "--no-format" ] ||
		[ "$1" == "--skip-prettier" ] ||
		[ "$1" == "--no-prettier" ] ||
		[ "$1" == "--skip-lint" ] ||
		[ "$1" == "--no-lint" ] ||
		[ "$1" == "--skip-eslint" ] ||
		[ "$1" == "--no-eslint" ] &&
			RUN_PRETTIER_CODE="echo ✂    ︎ skipping ${RUN_PRETTIER_CODE}" &&
			RUN_PRETTIER_DOCS="echo ✂    ︎ skipping ${RUN_PRETTIER_DOCS}"
		[ "$1" == "--skip-karma" ] ||
		[ "$1" == "--no-karma" ]  &&
			START_KARMA="echo ✂    ︎ skipping ${START_KARMA}"
		[ "$1" == "--skip-snapshot" ] ||
		[ "$1" == "--no-snapshot" ] ||
		[ "$1" == "--skip-jest" ] ||
		[ "$1" == "--no-jest" ]  &&
			SNAPSHOT_TESTS="echo ✂    ︎ skipping ${SNAPSHOT_TESTS}"
		[ "$1" == "--skip-docgen" ] ||
		[ "$1" == "--no-docgen" ] ||
		[ "$1" == "--skip-docs" ] ||
		[ "$1" == "--no-docs" ]  &&
			DOCGEN="echo ✂    ︎ skipping ${DOCGEN}"
		shift 1
	done
fi

declare -a COMMANDS=("${RUN_PRETTIER_CODE}" "${RUN_PRETTIER_DOCS}" "${START_KARMA}" "${SNAPSHOT_TESTS}" "${DOCGEN}")

printf "
Running DSR Travis-CI QA Scripts
"
runTests "${COMMANDS[@]}"
EXIT_CODE=$?

printf "
DSR Travis-CI QA Scripts Completed with exit condition ${EXIT_CODE}
"

exit $((10#$EXIT_CODE))

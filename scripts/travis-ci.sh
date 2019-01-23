#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

function runTests() {
COMMANDS=( "$@" )

printf "
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎

          _____   _____ _____    _______ ______  _____ _______ _____
         |  __ \\ / ____|  __ \\  |__   __|  ____|/ ____|__   __/ ____|
         | |  | | (___ | |__) |    | |  | |__  | (___    | | | (___
         | |  | |\\___ \\|  _  /     | |  |  __|  \\___ \\   | |  \\___ \\
         | |__| |____) | | \\ \\     | |  | |____ ____) |  | |  ____) |
         |_____/|_____/|_|  \\_\\    |_|  |______|_____/   |_| |_____/

☗         🃟🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃜🃝🃞🃟         ☖


Hit Ctrl+C to abort any currently executing script and immediately start
the next. The following scripts are about to execute one at a time:
"

for COMMAND in "${COMMANDS[@]}"
do
	echo "    ${COMMAND}"
done

echo -en 'travis_fold:start:npm ls\\r'
npm ls --silent
echo -en 'travis_fold:end:npm ls\\r'

for COMMAND in "${COMMANDS[@]}"
do
	echo "
_______________________________________________________________________________
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                ☕︎ Running ☕︎
    ${COMMAND}

"
NODE_ENV=test ${COMMAND}
	if [ $? -eq 0 ]; then
		echo "

    ${COMMAND}
                            ☆ Ran successfully ☆
≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
"
	else
		ERROR_CODE=$((10#$?))
		printf "
☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎
                     ______ _____  _____   ____  _____
                    |  ____|  __ \|  __ \ / __ \|  __ \\
                    | |__  | |__) | |__) | |  | | |__) |
                    |  __| |  _  /|  _  /| |  | |  _  /
                    | |____| | \ \| | \ \| |__| | | \ \\
                    |______|_|  \_\_|  \_\\\\____/|_|  \_\\

    ${COMMAND}
    ERROR CODE: ${ERROR_CODE}
                                 ☹︎ Failed ☹︎
≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
"
		exit $((10#$ERROR_CODE))
	fi
done

echo "

        ☆☆☆☆☆ Test scripts completed without detected errors. ☆☆☆☆☆
"
}

# Test that your NPM module dependendencies are not missing.
# [commented out until alpha dependencies for image storyshots
# and Babel are worked out]
# VALIDATE_NPM_MODULES='npm run validate'
# SKIP_VALIDATE_NPM_MODULES=false

# Prettier THEN ESlint on files within components and utilities folders.
# Prettier by itself will not work.
# Prettier ONLY on JSON and markdown files.
RUN_LINT='npm run lint'
SKIP_LINT=false
# Mocha framework tests that focus on user interaction
START_KARMA='npm run test:unit'
SKIP_START_KARMA=false
# Jest markup & image snapshot tests
SNAPSHOT_TESTS='npm run test:snapshot'
SKIP_SNAPSHOT_TESTS=false
# React DocGen library build of source code PropType comments into a JSON file for documentation site
DOCGEN='npm run build:docs && npm run test:docs'
SKIP_DOCGEN=false

numArgs=$#
# parse arguments
if (( numArgs >= 0 )); then
	until [ -z "$1" ]; do
		# [ "$1" == "--skip-validate" ] &&
		#	VALIDATE_NPM_MODULES="echo ✂    ︎ skipping ${VALIDATE_NPM_MODULES}"
		[ "$1" == "--fix" ] &&
			# Prettier THEN ESlint on files within components and utilities folders.
			# Prettier by itself will not work.
			# Prettier ONLY on JSON and markdown files.
			RUN_LINT='npm run lint:fix'
		[ "$1" == "--skip-prettier" ] ||
		[ "$1" == "--no-prettier" ] ||
		[ "$1" == "--skip-lint" ] ||
		[ "$1" == "--no-lint" ] ||
		[ "$1" == "--skip-eslint" ] ||
		[ "$1" == "--no-eslint" ] &&
			RUN_LINT="echo ✂    ︎ skipping ${RUN_LINT}" &&
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

declare -a COMMANDS=("${RUN_LINT}" "${START_KARMA}" "${SNAPSHOT_TESTS}" "${DOCGEN}")

printf "
Running DSR Travis-CI QA Scripts
"
runTests "${COMMANDS[@]}"
EXIT_CODE=$?

printf "
DSR Travis-CI QA Scripts Completed with exit condition ${EXIT_CODE}
"

exit $((10#$EXIT_CODE))

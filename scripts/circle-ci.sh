#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

# Jest markup & image snapshot tests (this is here so this variable can be used in runTest & elsewhere)
SNAPSHOT_TESTS='npm run test:dom-snapshot'
ACCESSIBILITY_TESTS='npm run test:accessibility'
export CHROME_BIN=/usr/bin/google-chrome

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

npm ls --silent

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
	# 	if [ "${COMMAND}" = "${SNAPSHOT_TESTS}" ]; then
  #       	echo "uploading diffs"
  #       	npm run upload-diffs
  #       else
  #       	echo "COMMAND: ${COMMAND} != SNAPSHOT_TESTS: ${SNAPSHOT_TESTS}"
  #       fi
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

# Mocha framework tests that focus on user interaction
START_KARMA='npm run test:unit'

# React DocGen library build of source code PropType comments into a JSON file for documentation site
DOCGEN='npm run build:docs && npm run test:docs'

numArgs=$#
# parse arguments
if (( numArgs >= 0 )); then
	# [ "$1" == "--skip-validate" ] &&
	#	VALIDATE_NPM_MODULES="echo ✂    ︎ skipping ${VALIDATE_NPM_MODULES}"
	[ "$1" == "--fix" ] &&
		# Prettier THEN ESlint on files within components and utilities folders.
		# Prettier by itself will not work.
		# Prettier ONLY on JSON and markdown files.
		RUN_LINT='npm run lint:fix'
	[ "$SKIP_LINT_TESTS" == "true" ] ||
	[ "$1" == "--skip-prettier" ] ||
	[ "$1" == "--no-prettier" ] ||
	[ "$1" == "--skip-lint" ] ||
	[ "$1" == "--no-lint" ] ||
	[ "$1" == "--skip-eslint" ] ||
	[ "$1" == "--no-eslint" ] &&
		RUN_LINT="echo ✂    ︎ skipping ${RUN_LINT}" &&
	[ "$SKIP_KARMA_TESTS" == "true" ] ||
	[ "$1" == "--skip-karma" ] ||
	[ "$1" == "--no-karma" ]  &&
		START_KARMA="echo ✂    ︎ skipping ${START_KARMA}"
	[ "$SKIP_SNAPSHOT_TESTS" == "true" ] ||
	[ "$1" == "--skip-snapshot" ] ||
	[ "$1" == "--no-snapshot" ] ||
	[ "$1" == "--skip-jest" ] ||
	[ "$1" == "--no-jest" ]  &&
		SNAPSHOT_TESTS="echo ✂    ︎ skipping ${SNAPSHOT_TESTS}"
	[ "$SKIP_ACCESSIBILITY_TESTS" == "true" ] ||
	[ "$1" == "--skip-accessibility" ] ||
	[ "$1" == "--no-accessibility" ] &&
		ACCESSIBILITY_TESTS="echo ✂    ︎ skipping ${ACCESSIBILITY_TESTS}"
	[ "$SKIP_DOCGEN" == "true" ] ||
	[ "$1" == "--skip-docgen" ] ||
	[ "$1" == "--no-docgen" ] ||
	[ "$1" == "--skip-docs" ] ||
	[ "$1" == "--no-docs" ]  &&
		DOCGEN="echo ✂    ︎ skipping ${DOCGEN}"
	shift 1
fi

declare -a COMMANDS=("${RUN_LINT}" "${START_KARMA}" "${SNAPSHOT_TESTS}" "${ACCESSIBILITY_TESTS}" "${DOCGEN}")

printf "
Running QA Scripts
"
runTests "${COMMANDS[@]}"
EXIT_CODE=$?

printf "
QA Scripts Completed with exit condition ${EXIT_CODE}
"

exit $((10#$EXIT_CODE))

#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license


printf "
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎☁︎

                    _____   _____ _____    _______ ______  _____ _______ _____
                   |  __ \\ / ____|  __ \\  |__   __|  ____|/ ____|__   __/ ____|
                   | |  | | (___ | |__) |    | |  | |__  | (___    | | | (___
                   | |  | |\\___ \\|  _  /     | |  |  __|  \\___ \\   | |  \\___ \\
                   | |__| |____) | | \\ \\     | |  | |____ ____) |  | |  ____) |
                   |_____/|_____/|_|  \\_\\    |_|  |______|_____/   |_| |_____/

☗                   🃟🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃜🃝🃞🃟                   ☖


Hit Ctrl+C to abort any currently executing script and immediately start the next.
The following scripts are about to execute one at a time:
"

# Prettier
RUN_FORMAT='npm run format'
SKIP_RUN_FORMAT=false
# ESlint tests on files within components and utilities folders. Doc examples and tests are currently excluded.
RUN_LINT='npm run lint'
SKIP_RUN_LINT=false
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
maxArgs=5
# parse arguments
if (( numArgs >= 0 && numArgs <= maxArgs )); then
	until [ -z "$1" ]; do
		[ "$1" == "--skip-format" ] || [ "$1" == "--no-format" ]  && RUN_FORMAT="echo ✂    ︎ skipping ${RUN_FORMAT}"
		[ "$1" == "--skip-lint" ] || [ "$1" == "--no-lint" ]  && RUN_LINT="echo ✂    ︎ skipping ${RUN_LINT}"
		[ "$1" == "--skip-karma" ] || [ "$1" == "--no-karma" ]  && START_KARMA="echo ✂    ︎ skipping ${START_KARMA}"
		[ "$1" == "--skip-snapshot" ] || [ "$1" == "--no-snapshot" ] || [ "$1" == "--skip-jest" ] || [ "$1" == "--no-jest" ]  && SNAPSHOT_TESTS="echo ✂    ︎ skipping ${SNAPSHOT_TESTS}"
		[ "$1" == "--skip-docgen" ] || [ "$1" == "--no-docgen" ] || [ "$1" == "--skip-docs" ] || [ "$1" == "--no-docs" ]  && DOCGEN="echo ✂    ︎ skipping ${DOCGEN}"
		shift 1
	done
else
	echo "unrecognized number of arguments ($#, max is $maxArgs). You passed in: $@"
	exit 1
fi

declare -a COMMANDS=("${RUN_FORMAT}" "${RUN_LINT}" "${START_KARMA}" "${SNAPSHOT_TESTS}" "${DOCGEN}")

for COMMAND in "${COMMANDS[@]}"
do
	echo "    ${COMMAND}"
done


for COMMAND in "${COMMANDS[@]}"
do
	echo "
____________________________________________________________________________________________________
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          ☕︎ Running ☕︎
    ${COMMAND}

"
NODE_ENV=test ${COMMAND}
	if [ $? -eq 0 ]; then
		echo "

    ${COMMAND}
                                      ☆ Ran successfully ☆
≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
"
	else
		printf "
☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎ ♈︎ ☹︎ ☈ ☔︎ ☇ ☭ 🃟 ⚑ ⚔︎ ⚛︎ ⚰︎
                                   ______ _____  _____   ____  _____
                                  |  ____|  __ \|  __ \ / __ \|  __ \\
                                  | |__  | |__) | |__) | |  | | |__) |
                                  |  __| |  _  /|  _  /| |  | |  _  /
                                  | |____| | \ \| | \ \| |__| | | \ \\
                                  |______|_|  \_\_|  \_\\\\____/|_|  \_\\

    ${COMMAND}
                                              ☹︎ Failed ☹︎
≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
"
		exit $?
	fi
done

echo "

                 ☆☆☆☆☆ Test scripts completed without detected errors. ☆☆☆☆☆
"




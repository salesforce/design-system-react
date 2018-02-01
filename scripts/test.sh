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

export -f runTests



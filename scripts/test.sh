#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

NODE_ENV=test node_modules/.bin/karma start --single-run "$@"
if [ $? -eq 0 ]
then
	NODE_ENV=test npm run snapshot-test
	if [ $? -eq 0 ]
	then
		NODE_ENV=test npm run build-docs
	fi
fi
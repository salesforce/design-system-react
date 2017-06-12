#!/usr/bin/env bash

# Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
# Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

# Mocha framework tests that focus on user interaction
NODE_ENV=test node_modules/.bin/karma start --single-run "$@"
if [ $? -eq 0 ]
then
  # Jest markup snapshot tests
	NODE_ENV=test npm run snapshot-test
	if [ $? -eq 0 ]
	then
		# ESlint tests on files within components and utilities folders. Doc examples and tests are currently excluded.
		NODE_ENV=test npm run lint-prod
		if [ $? -eq 0 ]
		then
			# React DocGen library build of source comments into a JSON file for documentation site
			NODE_ENV=test npm run build-docs
		fi
	fi
fi
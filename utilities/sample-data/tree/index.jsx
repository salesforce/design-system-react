/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/*
  Sample data for Tree component
    * base - Default node dataset
    * large - contains 300+ branches (~1000 nodes) to test performance
    * initialState - contains selection and expanded branches
 */

import base from './nodes-base';
import large from './nodes-with-large-dataset';
import initialState from './nodes-with-initial-state';

const sampleNodes = {
	base,
	large,
	initialState,
};

export default sampleNodes;

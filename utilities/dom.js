/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable consistent-return */

import React from 'react';

/**
 * Traverse all children
 */
function flatMapChildren(children, iterator) {
	const result = [];
	function go(xs) {
		return React.Children.map(xs, (child) => {
			// eslint-disable-next-line fp/no-mutating-methods
			result.push(iterator(child));
			if (child.type) go(child.props.children);
		});
	}
	go(children);
	return result;
}

/**
 * Perhaps there's a more pragmatic way to do this. Eventually, I suspect we'll have some utils to help find children.
 */
function hasChild(children, name) {
	let flag = false;
	flatMapChildren(children, (child) => {
		flag = flag || (child.type && child.type.name === name);
	});
	return flag;
}

// findDOMNode complains so filter out strings from virtual dom
function textContent(children) {
	return flatMapChildren(children, (child) => {
		// eslint-disable-line consistent-return
		if (typeof child === 'string') return child;
	}).join(' ');
}

const helpers = { textContent, hasChild };

export default helpers;

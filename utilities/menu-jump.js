/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// import ReactDOM from 'react-dom';
import escapeRegExp from 'lodash.escaperegexp';

const menuJump = ({
	container,
	itemTag = 'li',
	key,
	keyBuffer,
	keyCode,
	options,
	scrollToFocusedIndex = true
}) => {
	let ch = key || String.fromCharCode(keyCode);

	if (/^[ -~]$/.test(ch)) {
		ch = ch.toLowerCase();
	} else {
		ch = null;
	}

	const pattern = keyBuffer(ch);
	let consecutive = 0;
	let focusedIndex;

	// Support for navigating to the next option of the same letter with repeated presses of the same key
	if (
		pattern.length > 1 &&
		new RegExp(`^[${escapeRegExp(ch)}]+$`).test(pattern)
	) {
		consecutive = pattern.length;
	}

	options.forEach((item, index) => {
		const itemLabel = item.label.toLowerCase();

		if (
			(focusedIndex === undefined && itemLabel.substr(0, pattern.length) === pattern) ||
			(consecutive > 0 && itemLabel.substr(0, 1) === ch)
		) {
			consecutive -= 1;
			focusedIndex = index;
		}
	});

	// Scrolls the container to the appropriate item. Assumes container is positioned (absolute, relative, etc)
	if (scrollToFocusedIndex && focusedIndex !== undefined) {
		const domItem = container.querySelector(`${itemTag}:nth-child(${focusedIndex+1})`);
		container.scrollTop = domItem.offsetTop;
	}

	return focusedIndex;
};

export default menuJump;

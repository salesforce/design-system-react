/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Scrolls a menu container to the appropriate focused item. Assumes container is positioned (absolute, relative, etc)
const menuItemSelectScroll = ({ container, focusedIndex, itemTag = 'li' }) => {
	const domItem = container.querySelector(
		`${itemTag}:nth-child(${focusedIndex + 1})`
	);

	if (domItem) {
		if (
			domItem.offsetHeight + domItem.offsetTop >= container.offsetHeight ||
			domItem.offsetTop <= container.scrollTop
		) {
			container.scrollTop = domItem.offsetTop;
		}
	}
};

export default menuItemSelectScroll;

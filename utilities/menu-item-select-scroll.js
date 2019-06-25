/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Scrolls a menu container to the appropriate focused item. Assumes container is positioned (absolute, relative, etc)
const menuItemSelectScroll = ({
	container,
	focusedIndex,
	itemTag = 'li',
	scrollPadding = 4,
}) => {
	const domItem = container.querySelector(
		`${itemTag}:nth-child(${focusedIndex + 1})`
	);

	if (domItem) {
		if (
			domItem.offsetHeight - container.scrollTop + domItem.offsetTop >=
			container.offsetHeight
		) {
			// eslint-disable-next-line no-param-reassign
			container.scrollTop =
				domItem.offsetHeight +
				domItem.offsetTop -
				container.offsetHeight +
				scrollPadding;
		} else if (domItem.offsetTop <= container.scrollTop) {
			// eslint-disable-next-line no-param-reassign
			container.scrollTop = domItem.offsetTop - scrollPadding;
		}
	}
};

export default menuItemSelectScroll;

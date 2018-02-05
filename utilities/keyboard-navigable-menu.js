/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Keyboard Navigable Trait

// ## Dependencies

// ### React
import ReactDOM from 'react-dom';

// ### escapeRegExp
import escapeRegExp from 'lodash.escaperegexp';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### Event Helpers
import KEYS from './key-code';

/* eslint-disable react/no-find-dom-node */

const noop = () => {};

export function KeyBuffer () {
	this.buffer = '';

	return (key) => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}

		this.timeout = setTimeout(() => {
			this.buffer = '';
		}, 400);

		this.buffer = this.buffer + key;
		return this.buffer;
	};
}

export function itemIsSelectable (item) {
	return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
}

export function getNavigableItems (items) {
	const navigableItems = [];
	navigableItems.indexes = [];
	navigableItems.keyBuffer = new KeyBuffer();

	if (Array.isArray(items)) {
		items.forEach((item, index) => {
			if (itemIsSelectable(item)) {
				navigableItems.push({
					index,
					text: `${item.label}`.toLowerCase(),
				});

				navigableItems.indexes.push(index);
			}
		});
	}

	return navigableItems;
}

export function keyboardNavigate ({
	componentContext,
	currentFocusedIndex,
	isOpen,
	event,
	key,
	keyCode,
	navigableItems,
	onFocus,
	onSelect,
	target,
	toggleOpen,
}) {
	const indexes = navigableItems.indexes;
	const lastIndex = indexes.length - 1;
	let focusedIndex;
	let ch = key || String.fromCharCode(keyCode);

	if (/^[ -~]$/.test(ch)) {
		ch = ch.toLowerCase();
	} else {
		ch = null;
	}

	const openMenuKeys =
		keyCode === KEYS.ENTER || keyCode === KEYS.SPACE || keyCode === KEYS.UP;

	if (keyCode === KEYS.ESCAPE) {
		if (isOpen) toggleOpen();
	} else if (!isOpen) {
		focusedIndex = indexes[0];
		if (openMenuKeys || ch) {
			toggleOpen();
		}
		if (
			openMenuKeys &&
			componentContext.trigger &&
			ReactDOM.findDOMNode(componentContext.trigger) === target
		) {
			// eslint-disable-line react/no-find-dom-node
			componentContext.handleClick(event);
		}
	} else if (keyCode === KEYS.ENTER || keyCode === KEYS.SPACE) {
		onSelect(currentFocusedIndex);
	} else {
		const navigableIndex = indexes.indexOf(currentFocusedIndex);

		if (keyCode === KEYS.DOWN) {
			if (navigableIndex < lastIndex) {
				const newNavigableIndex = navigableIndex + 1;
				focusedIndex = indexes[newNavigableIndex];
			} else {
				focusedIndex = indexes[0];
			}
		} else if (keyCode === KEYS.UP) {
			if (navigableIndex > 0) {
				const newNavigableIndex = navigableIndex - 1;
				focusedIndex = indexes[newNavigableIndex];
			} else {
				focusedIndex = indexes[lastIndex];
			}
		} else if (ch) {
			// Combine subsequent keypresses
			const pattern = navigableItems.keyBuffer(ch);
			let consecutive = 0;

			// Support for navigating to the next option of the same letter with repeated presses of the same key
			if (
				pattern.length > 1 &&
				new RegExp(`^[${escapeRegExp(ch)}]+$`).test(pattern)
			) {
				consecutive = pattern.length;
			}

			navigableItems.forEach((item) => {
				if (
					(focusedIndex === undefined &&
						item.text.substr(0, pattern.length) === pattern) ||
					(consecutive > 0 && item.text.substr(0, 1) === ch)
				) {
					consecutive -= 1;
					focusedIndex = item.index;
				}
			});
		}
	}

	onFocus(focusedIndex);

	return focusedIndex;
}

function getMenu (componentRef) {
	return ReactDOM.findDOMNode(componentRef).querySelector('ul.dropdown__list'); // eslint-disable-line react/no-find-dom-node
}

function getMenuItem (menuItemId, context = document) {
	let menuItem;

	if (menuItemId) {
		menuItem = context.getElementById(menuItemId);
	}

	return menuItem;
}

export const KeyboardNavigableMixin = {
	componentWillMount () {
		this.navigableItems = getNavigableItems(this.props.options);
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.options) {
			this.navigableItems = getNavigableItems(nextProps.options);
		}
	},

	// Handling open / close toggling is optional, and a default implementation is provided for handling focus, but selection _must_ be handled
	handleKeyboardNavigate ({
		event,
		isOpen = true,
		keyCode,
		onFocus = this.handleKeyboardFocus,
		onSelect,
		target,
		toggleOpen = noop,
	}) {
		keyboardNavigate({
			componentContext: this,
			currentFocusedIndex: this.state.focusedIndex,
			event,
			isOpen,
			keyCode,
			navigableItems: this.navigableItems,
			onFocus,
			onSelect,
			target,
			toggleOpen,
		});
	},

	// This is a bit of an anti-pattern, but it has the upside of being a nice default. Component authors can always override to only set state and do their own focusing in their subcomponents.
	handleKeyboardFocus (focusedIndex) {
		if (this.state.focusedIndex !== focusedIndex) {
			this.setState({ focusedIndex });
		}

		const menu = isFunction(this.getMenu) ? this.getMenu() : getMenu(this);

		const menuItem = isFunction(this.getMenuItem)
			? this.getMenuItem(focusedIndex, menu)
			: getMenuItem(this.getListItemId(focusedIndex));

		if (menuItem) {
			this.focusMenuItem(menuItem);
			this.scrollToMenuItem(menu, menuItem);
		}
	},

	getListItemId (index) {
		let menuItemId;

		if (index !== undefined) {
			const menuId = isFunction(this.getId) ? this.getId() : this.props.id;
			menuItemId = `${menuId}-item-${index}`;
		}

		return menuItemId;
	},

	focusMenuItem (menuItem) {
		menuItem.getElementsByTagName('a')[0].focus();
	},

	scrollToMenuItem (menu, menuItem) {
		if (menu && menuItem) {
			const menuHeight = menu.offsetHeight;

			const menuTop = menu.scrollTop;
			const menuItemTop = menuItem.offsetTop - menu.offsetTop;

			if (menuItemTop < menuTop) {
				menu.scrollTop = menuItemTop;
			} else {
				const menuBottom = menuTop + menuHeight + menu.offsetTop;
				const menuItemBottom =
					menuItemTop + menuItem.offsetHeight + menu.offsetTop;

				if (menuItemBottom > menuBottom) {
					menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
				}
			}
		}
	},
};

export default KeyboardNavigableMixin;

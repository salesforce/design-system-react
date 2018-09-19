/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Keyboard Navigable mixin (deprecated. DO NOT USE)
import ReactDOM from 'react-dom';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### Event Helpers
import KeyBuffer from './key-buffer';
import keyboardNavigate from './keyboard-navigate';

/* eslint-disable react/no-find-dom-node */

const noop = () => {};

export function itemIsSelectable(item) {
	return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
}

export function getNavigableItems(items) {
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

function getMenu(componentRef) {
	return ReactDOM.findDOMNode(componentRef).querySelector('ul.dropdown__list'); // eslint-disable-line react/no-find-dom-node
}

function getMenuItem(menuItemId, context = document) {
	let menuItem;

	if (menuItemId) {
		menuItem = context.getElementById(menuItemId);
	}

	return menuItem;
}

export const KeyboardNavigableMixin = {
	componentWillMount() {
		this.navigableItems = getNavigableItems(this.props.options);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.options) {
			this.navigableItems = getNavigableItems(nextProps.options);
		}
	},

	// Handling open / close toggling is optional, and a default implementation is provided for handling focus, but selection _must_ be handled
	handleKeyboardNavigate({
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
	handleKeyboardFocus(focusedIndex) {
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

	getListItemId(index) {
		let menuItemId;

		if (index !== undefined) {
			const menuId = isFunction(this.getId) ? this.getId() : this.props.id;
			menuItemId = `${menuId}-item-${index}`;
		}

		return menuItemId;
	},

	focusMenuItem(menuItem) {
		menuItem.getElementsByTagName('a')[0].focus();
	},

	scrollToMenuItem(menu, menuItem) {
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

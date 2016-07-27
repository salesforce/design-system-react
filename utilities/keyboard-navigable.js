/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Keyboard Navigable Trait

// ## Dependencies

// ### React
import ReactDOM from 'react-dom';

// ### escapeRegExp
import escapeRegExp from 'lodash.escaperegexp';

// ### isArray
import isArray from 'lodash.isarray';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### Event Helpers
import KEYS from './KEYS';

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

	if (isArray(items)) {
		items.forEach((item, index) => {
			if (itemIsSelectable(item)) {
				navigableItems.push({
					index,
					text: (`${item.label}`).toLowerCase()
				});

				navigableItems.indexes.push(index);
			}
		});
	}

	return navigableItems;
}

export function keyboardNavigate ({ currentFocusedIndex, isOpen, keyCode, navigableItems, onFocus, onSelect, toggleOpen }) {
	const indexes = navigableItems.indexes;
	const lastIndex = indexes.length - 1;
	let focusedIndex = undefined;

	if (keyCode === KEYS.ESCAPE) {
		if (isOpen) toggleOpen();
	} else if (!isOpen) {
		focusedIndex = indexes[0];
		toggleOpen();
	} else if (keyCode === KEYS.ENTER || keyCode === KEYS.SPACE) {
		onSelect(currentFocusedIndex);
	} else {
		let navigableIndex = indexes.indexOf(currentFocusedIndex);
		let ch = String.fromCharCode(keyCode);

		if (keyCode === KEYS.DOWN) {
			if (navigableIndex < lastIndex) {
				focusedIndex = indexes[++navigableIndex];
			} else {
				focusedIndex = indexes[0];
			}
		} else if (keyCode === KEYS.UP) {
			if (navigableIndex > 0) {
				focusedIndex = indexes[--navigableIndex];
			} else {
				focusedIndex = indexes[lastIndex];
			}
		} else if (ch) {
			ch = ch.toLowerCase();

			// Combine subsequent keypresses
			const pattern = navigableItems.keyBuffer(ch);
			let consecutive = 0;

			// Support for navigating to the next option of the same letter with repeated presses of the same key
			if (pattern.length > 1 && new RegExp(`^[${escapeRegExp(ch)}]+$`).test(pattern)) {
				consecutive = pattern.length;
			}

			navigableItems.forEach((item) => {
				if ((focusedIndex === undefined && item.text.substr(0, pattern.length) === pattern) ||
					(consecutive > 0 && item.text.substr(0, 1) === ch)) {
					consecutive--;
					focusedIndex = item.index;
				}
			});
		}
	}

	onFocus(focusedIndex);

	return focusedIndex;
}

function getMenu (componentRef) {
	return ReactDOM.findDOMNode(componentRef).querySelector('ul.dropdown__list');
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
	handleKeyboardNavigate ({ isOpen = true, keyCode, onFocus = this.handleKeyboardFocus, onSelect, toggleOpen = noop }) {
		keyboardNavigate({
			currentFocusedIndex: this.state.focusedIndex,
			isOpen,
			keyCode,
			navigableItems: this.navigableItems,
			onFocus,
			onSelect,
			toggleOpen
		});
	},

	// This is a bit of an anti-pattern, but it has the upside of being a nice default. Component authors can always override to only set state and do their own focusing in their subcomponents.
	handleKeyboardFocus (focusedIndex) {
		if (this.state.focusedIndex !== focusedIndex) this.setState({ focusedIndex });

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
				const menuItemBottom = menuItemTop + menuItem.offsetHeight + menu.offsetTop;

				if (menuItemBottom > menuBottom) {
					menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
				}
			}
		}
	}
};

export default KeyboardNavigableMixin;

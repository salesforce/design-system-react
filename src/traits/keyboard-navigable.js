// KEYBOARD NAVIGABLE

import * as Lib from '../lib/lib';

const KeyBuffer = function () {
	const self = this;
	this.buffer = '';
	
	return function add (key) {
		if (self.timeout) {
			Lib.global.clearTimeout(self.timeout);
			self.timeout = undefined;
		}
		
		self.timeout = Lib.global.setTimeout(function () {
			self.buffer = '';
		}, 400);
		
		self.buffer = self.buffer + key;
		return self.buffer;
	};
};

const KeyboardNavigable = {
	_defaultState: {
		focusedIndex: -1
	},

	_initializer () {
		this._keyBuffer = new KeyBuffer();
	},

	_keyboardNav (input, menuItems) {
		const isOpen = this.getState('isOpen');
		
		if (!isOpen) {
			this.setState({
				isOpen: true,
				focusedIndex: this._defaultState.focusedIndex
			});
		} else {
			let index = this.getState('focusedIndex');
			let selection;
			
			if (input.length === 1) {
				// Combine subsequent keypresses
				const pattern = this._keyBuffer(input).toLowerCase();
				let consecutive = 0;
				
				// Support for navigating to the next option of the same letter with repeated presses of the same key
				if (pattern.length > 1 && new RegExp('^[' + input.replace('\\', '\\\\') + ']+$').test(pattern)) {
					consecutive = pattern.length;
				}
				
				menuItems.forEach(function compareMenuItem (menuItem, i) {
					if ((!selection && menuItem.textContent.substr(0, pattern.length).toLowerCase() === pattern) ||
						(consecutive > 0 && menuItem.textContent.substr(0, 1).toLowerCase() === input)) {
						consecutive--;
						index = i;
						selection = menuItem;
					}
				});
			} else if (/(ArrowDown)/.test(input)) {
				if (index < menuItems.length - 1) {
					index++;
					selection = menuItems[index];
				}
			} else if (/(ArrowUp)/.test(input)) {
				if (index > this._defaultState.focusedIndex) {
					index--;
					selection = menuItems[index];
				}
			}
			
			this.setState({
				focusedIndex: index
			});
	
			if (selection) selection.focus();
		}
	}
};

export default KeyboardNavigable;

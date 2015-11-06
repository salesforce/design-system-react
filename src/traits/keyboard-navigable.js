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
		this._isSelectable = !Lib.isFunction(this.accessors.isSelectable);
	},
	
	_getNavigableItems () {
		const items = [];
		items.lastIndex = -1;
		items.indexes = [];
		
		this._collection.forEach((item, index) => {
			if (this._isSelectable || item.isSelectable()) {
				items.push({
					index,
					text: item.getText().toLowerCase()
				});
				
				items.indexes.push(index);
				items.lastIndex = index;
			}
		});
		
		return items;
	},

	_keyboardNav (input, onSelect) {
		const isOpen = this.getState('isOpen');
		const navigableItems = this._getNavigableItems();
		const indexes = navigableItems.indexes;
		const lastIndex = navigableItems.lastIndex;
		let index = -1;
		let selection;
		
		if (/(Escape)/.test(input)) {
			if (isOpen && Lib.isFunction(this.close)) this.close();
		} else if (!isOpen && Lib.isFunction(this.open)) {
			this.open();
		} else if (/(Enter)/.test(input)) {
			selection = this.getState('focusedSelection');
			
			if (selection && Lib.isFunction(onSelect)) {
				onSelect(selection);
			}
		} else {
			index = this.getState('focusedIndex');
			let navigableIndex = indexes.indexOf(index);
			
			if (input.length === 1) {
				// Combine subsequent keypresses
				const pattern = this._keyBuffer(input.toLowerCase());
				let consecutive = 0;
				
				// Support for navigating to the next option of the same letter with repeated presses of the same key
				if (pattern.length > 1 && new RegExp('^[' + input.replace('\\', '\\\\') + ']+$').test(pattern)) {
					consecutive = pattern.length;
				}
				
				navigableItems.forEach((item) => {
					if ((!selection && item.text.substr(0, pattern.length) === pattern) ||
						(consecutive > 0 && item.text.substr(0, 1) === input.toLowerCase())) {
						consecutive--;
						index = item.index;
					}
				});
			} else if (/(ArrowDown)/.test(input)) {
				if (index < lastIndex) {
					index = indexes[++navigableIndex];
				} else {
					index = lastIndex;
				}
			} else if (/(ArrowUp)/.test(input)) {
				if (index > -1) {
					index = indexes[--navigableIndex] || -1;
				} else {
					index = -1;
				}
			}
		}
		
		if (index > -1) {
			selection = this._collection.at(index);
		}
		
		this.setState({
			focusedIndex: index,
			focusedSelection: selection
		});
		
		return selection;
	}
};

export default KeyboardNavigable;

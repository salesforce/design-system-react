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
		focusedIndex: undefined
	},

	_initializer () {
		this._keyBuffer = new KeyBuffer();
		this._isSelectable = !this.accessors || !Lib.isFunction(this.accessors.isSelectable);
	},
	
	_getNavigableItems () {
		const items = [];
		items.indexes = [];
		
		this._collection.forEach((item, index) => {
			if (this._isSelectable || item.isSelectable()) {
				items.push({
					index,
					text: ('' + item.getText()).toLowerCase()
				});
				
				items.indexes.push(index);
			}
		});
		
		return items;
	},

	_keyboardNav (input, onSelect) {
		const isOpen = this.getState('isOpen');
		const navigableItems = this._navigableItems || this._getNavigableItems();
		const indexes = navigableItems.indexes;
		const lastIndex = indexes.length - 1;
		let focusedIndex = undefined;
		let focusedSelection;
		
		if (/(Escape)/.test(input)) {
			if (isOpen && Lib.isFunction(this.close)) this.close();
		} else if (!isOpen && Lib.isFunction(this.open)) {
			this.open();
		} else if (/(Enter)/.test(input)) {
			focusedSelection = this.getState('focusedSelection');
			
			if (focusedSelection && Lib.isFunction(onSelect)) {
				onSelect(focusedSelection);
				focusedSelection = undefined;
			}
		} else {
			let navigableIndex = indexes.indexOf(this.getState('focusedIndex'));
			
			if (input.length === 1) {
				// Combine subsequent keypresses
				const pattern = this._keyBuffer(input.toLowerCase());
				let consecutive = 0;
				
				// Support for navigating to the next option of the same letter with repeated presses of the same key
				if (pattern.length > 1 && new RegExp('^[' + input.replace('\\', '\\\\') + ']+$').test(pattern)) {
					consecutive = pattern.length;
				}
				
				navigableItems.forEach((item) => {
					if ((focusedIndex === undefined && item.text.substr(0, pattern.length) === pattern) ||
						(consecutive > 0 && item.text.substr(0, 1) === input.toLowerCase())) {
						consecutive--;
						focusedIndex = item.index;
					}
				});
			} else if (/(ArrowDown)/.test(input)) {
				if (navigableIndex < lastIndex) {
					focusedIndex = indexes[++navigableIndex];
				} else {
					focusedIndex = indexes[0];
				}
			} else if (/(ArrowUp)/.test(input)) {
				if (navigableIndex > 0) {
					focusedIndex = indexes[--navigableIndex];
				}
			}
		}
		
		if (Lib.isNumber(focusedIndex)) {
			focusedSelection = this._collection.at(focusedIndex);
		}
		
		this.setState({
			focusedIndex,
			focusedSelection
		});
		
		return focusedIndex;
	}
};

export default KeyboardNavigable;

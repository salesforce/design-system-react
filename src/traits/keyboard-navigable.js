// KEYBOARD NAVIGABLE

import * as Lib from '../lib/lib';

// Traits
import Openable from './openable';

function KeyBuffer () {
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
}

function initializeKeyBuffer (controlContext) {
	controlContext._keyboardNavigableKeyBuffer = new KeyBuffer();
}

function initializeIsSelectable (controlContext) {
	controlContext._keyboardIsSelectable = !controlContext.accessors || !Lib.isFunction(controlContext.accessors.isSelectable);
}

const KeyboardNavigable = {
	getNavigableItems (controlContext, collection) {
		const items = [];
		items.indexes = [];
		
		if (controlContext._keyboardIsSelectable === undefined) {
			initializeIsSelectable(controlContext);
		}
		
		collection.forEach((item, index) => {
			if (controlContext._keyboardIsSelectable || item.isSelectable()) {
				items.push({
					index,
					text: ('' + item.getText()).toLowerCase()
				});
				
				items.indexes.push(index);
			}
		});
		
		return items;
	},

	keyboardNav (controlContext, input, onSelect, collection) {
		const isOpen = Openable.isOpen(controlContext);
		const navigableItems = controlContext.getState('navigableItems') || KeyboardNavigable.getNavigableItems(controlContext, collection);
		const indexes = navigableItems.indexes;
		const lastIndex = indexes.length - 1;
		let focusedIndex = undefined;
		let focusedSelection;
		
		if (/(Escape)/.test(input)) {
			if (isOpen) Openable.close(controlContext);
		} else if (!isOpen) {
			Openable.open(controlContext);
		} else if (/(Enter)/.test(input)) {
			focusedSelection = controlContext.getState('focusedSelection');

			if (focusedSelection && Lib.isFunction(onSelect)) {
				onSelect(focusedSelection);
				focusedSelection = undefined;
			}
		} else {
			let navigableIndex = indexes.indexOf(controlContext.getState('focusedIndex'));
			
			if (input.length === 1) {
				if (controlContext._keyboardNavigableKeyBuffer === undefined) {
					initializeKeyBuffer(controlContext);
				}
				
				// Combine subsequent keypresses
				const pattern = controlContext._keyboardNavigableKeyBuffer(input.toLowerCase());
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
				// TODO: Sync up key "strings" and standardize input into this trait. May need JSON map of react strings to standard strings
			} else if (/(ArrowDown|DOWN)/.test(input)) {
				if (navigableIndex < lastIndex) {
					focusedIndex = indexes[++navigableIndex];
				} else {
					focusedIndex = indexes[0];
				}
			} else if (/(ArrowUp|UP)/.test(input)) {
				if (navigableIndex > 0) {
					focusedIndex = indexes[--navigableIndex];
				}
			}
		}
		
		if (Lib.isNumber(focusedIndex)) {
			focusedSelection = collection.at(focusedIndex);
		}
		
		controlContext.setState({
			focusedIndex,
			focusedSelection
		});
		
		return focusedIndex;
	}
};

export default KeyboardNavigable;

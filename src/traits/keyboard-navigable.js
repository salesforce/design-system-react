/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

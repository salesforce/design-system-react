// TREE CONTROL

import * as Lib from './lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'tree';

const TreeCore = Lib.extend({}, Base, Disableable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_getDefaultStore () {
		return {
			cacheItems: false,
			disabled: false,
			dataSource: null,
			folderSelect: false,
			itemSelect: false,
			multiSelect: false
		};
	},

	_getDefaultState () {
		return {
			itemStates: {}
		};
	},

	_initializeOptions (options) {
		if (options && options.collection) {
			this._collection = Lib.getDataAdapter(options.collection);
		} else if (!this._collection) {
			this._collection = Lib.getDataAdapter([]);
		}

		this._initializeDisableable(options);
	},

	accessors: {
		getText (item) {
			return item.get('text');
		},

		getChildren (item) {
			return Promise.resolve(Lib.getDataAdapter(item.get('children')));
		},

		getType (item) {
			return item.get('_itemType');
		},

		getIconClass (item) {
			return item.get('_iconClass');
		},

		getExpandable (item) {
			return !!item.get('_isExpandable');
		},

		getItemState (item) {
			const _item = Lib.getItemAdapter( item );
			const id = _item.get('id');
			const itemStates = this.getState('itemStates');

			if ( typeof id === 'undefined' ) {
				throw new Error('A unique id is required!');
			}

			const itemState = itemStates[id] || {
				selected: false,
				open: false,
				loading: false
			};

			Lib.extend( itemState, {
				item: _item._item
			} );

			if ( !itemStates[id] ) {
				itemStates[id] = itemState;
			}

			return itemState;
		}
	},

	_setItemState (item, state) {
		const itemState = this.accessors.getItemState.call(this, item);
		const itemStates = this.getState('itemStates');
		const _item = Lib.getItemAdapter(itemState.item);
		const id = _item.get('id');

		if (typeof id === 'undefined') {
			throw new Error('A unique id is required!');
		}

		Lib.extend(itemState, state);
		itemStates[id] = itemState;
		this.setState({ itemStates });
	},

	_selectItem (item) {
		const itemStates = this.getState('itemStates');
		const selected = this.accessors.getItemState.call(this, item).selected;

		if (!this.getStore('multiSelect')) {
			this._setItemState(item, {selected: !selected});
			Object.keys(itemStates).forEach(itemId => {
				if (itemId !== item.get('id').toString()) { // Need a toString here because itemId is an object literal key, and therefore a string.
					this._setItemState(itemStates[itemId].item, { selected: false });
				}
			});
		} else {
			const currentItemState = this.accessors.getItemState.call(this, item);
			currentItemState.selected = !currentItemState.selected;
			this._setItemState(item, currentItemState);
		}
	},

	_deselectAll () {
		const itemStates = this.getState('itemStates');

		Object.keys(itemStates).forEach( itemId => {
			this._setItemState( itemStates[itemId].item, { selected: false } );
		});
	},

	_toggleFolder (folder) {
		this._setItemState(folder, {open: !this.accessors.getItemState.call(this, folder).open});
	},

	getSelectedItems () {
		const itemStates = this.getState('itemStates');
		const selectedItems = [];
		
		Object.keys(itemStates).forEach((itemId) => {
			if (itemStates[itemId].selected) {
				selectedItems.push(itemStates[itemId].item);
			}
		});

		return selectedItems;
	}
});

export default TreeCore;

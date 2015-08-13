// TREE CONTROL

import * as Lib from './lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'tree';

const TreeCore = Lib.extend({}, Base, Disableable, {
	// CSS classes used within this control
	_cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	__getInitialState () {
		return {
			cacheItems: false,
			disabled: false,
			dataSource: null,
			folderSelect: false,
			itemSelect: false,
			multiSelect: false,
			itemStates: {}
		};
	},

	__initializeOptions (options) {
		if (options && options.collection) {
			this._collection = options.collection;
		} else if (this.collection) {
			this._collection = this.collection;
		} else if (!this._collection) {
			this._collection = [];
		}

		this.__initializeDisableable(options);
	},
	
	accessors: {
		getText (item) {
			return Lib.getProp(item, 'text');
		},
		
		getChildren (item) {
			return Promise.resolve(Lib.getProp(item, 'children'));
		},
		
		getType (item) {
			return Lib.getProp(item, '_itemType');
		},
		
		getIconClass (item) {
			return Lib.getProp(item, '_iconClass');
		},
		
		getExpandable (item) {
			return !!Lib.getProp(item, '_isExpandable');
		},
		
		getItemState (item) {
			const id = Lib.getProp(item, 'id');
			const itemStates = self.__getState('itemStates');
			
			if (!id) {
				throw new Error('A unique id is required!');
			}

			itemState = itemStates[id] || {
				selected: false,
				open: false,
				loading: false,
				item: item
			};
			
			return itemState;
		}
	},

	__retrieveData (folderInfo) {
		const self = this;

		this.dataSource(folderInfo ? folderInfo : {}, function (source) {
			const currentNodesState = self.__getState('treeNodes');
			const stateData = {};
			let currentDeepItem;

			if (folderInfo) {
				currentDeepItem = self.__findDeepItem(folderInfo._id);
			}

			if (source.data && source.data.length) {
				// Adding unique identifiers
				source.data.forEach(function (nodeData) {
					nodeData._id = Symbol();
					nodeData._parent = folderInfo ? folderInfo._id : null;
					nodeData._state = {
						selected: false,
						open: false,
						loading: false,
						populated: false
					};
				});

				if (currentDeepItem) {
					// but what if they have children of their own. Keep that in mind for later
					currentDeepItem._children = source.data;
					currentDeepItem._state.open = true;
					currentDeepItem._state.populated = true;
				} else {
					stateData.treeNodesDeep = source.data;
				}

				stateData.treeNodes = currentNodesState.concat(source.data);

				self.__setState(stateData);
				if (Lib.isFunction(self.populateTree)) self.populateTree(folderInfo, source);
			}
		});
	},

	__findDeepItem (id) {
		const deepTree = this.__getState('treeNodesDeep');
		const find = (treeItems) => {
			let foundItem;

			treeItems.forEach((treeItem) => {
				if (foundItem) return;
				
				if (id === treeItem._id) {
					foundItem = treeItem;
				} else if (treeItem._children && treeItem._children.length) {
					foundItem = find(treeItem._children);
				}
			});

			return foundItem;
		};

		return find(deepTree);
	},

	__selectItem (item) {
		const itemState = getItemState(item);
		
		itemState.selected = true;
		this.__setState(this._state);
	},

	__toggleFolder (folder) {
		const itemState = getItemState(folder);
		
		itemState.open = !itemState.open;
		this.__setState(this._state);
	},

	getSelectedItems () {
		const itemStates = this.__getState('itemStates');
		const selectedItems = [];
		
		itemStates.forEach((itemState) => {
			if (itemState.selected) {
				selectedItems.push(itemState.item);
			}
		});

		return selectedItems;
	}
});

export default TreeCore;

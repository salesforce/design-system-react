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
			const itemStates = this.__getState('itemStates');
			let itemState;
			if (!id) {
				throw "A unique id is required!";
			}

			return itemState = itemStates[id] || {
					selected: false,
					open: false,
					loading: false,
					item: item
				};
		}
	},

	__retrieveData (folderInfo) {
		var self = this;

		this.dataSource(folderInfo ? folderInfo : {}, function (source) {
			var currentNodesState = self.__getState('treeNodes');
			var stateData = {};
			var currentDeepItem;

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
		var deepTree = this.__getState('treeNodesDeep');
		var find = (treeItems) => {
			var foundItem;

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

	__setItemState (item, state) {
		var itemStates = this.__getState('itemStates');
		let id = Lib.getProp(item, 'id');
		if (!id) {
			throw "A unique id is required!";
		}

		var itemState = this.accessors.getItemState(item);
		Lib.extend(itemState, state);
		itemStates[id] = itemState;
		this.__setState({itemStates});
	},

	__selectItem (item) {
		this.__setItemState(item, {selected: true});
	},

	__toggleFolder (folder) {
		this.__setItemState(folder, {open: !this.accessors.getItemState(folder).open});
	},

	getSelectedItems () {
		const itemStates = this.__getState('itemStates');
		let selectedItems = [];

		itemStates.forEach((itemState) => {
			if (itemState.selected) {
				selectedItems.push(itemState.item);
			}
		});

		return selectedItems;
	}
});

export default TreeCore;

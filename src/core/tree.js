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
			this._collection = Lib.getDataAdapter(options.collection);
		} else if (this.collection) {
			this._collection = Lib.getDataAdapter(this.collection);
		} else if (!this._collection) {
			this._collection = Lib.getDataAdapter([]);
		}

		// TODO - Address this.
		this.setState({
			multiSelect: options.multiSelect,
			folderSelect: options.folderSelect
		});

		this.__initializeDisableable(options);
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
			const id = item.get('id');
			const itemStates = this.state.itemStates;
			if (!id) {
				throw new Error('A unique id is required!');
			}

			const itemState = itemStates[id] || {
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
			const currentNodesState = self.state.treeNodes;
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

				self.setState(stateData);
				if (Lib.isFunction(self.populateTree)) self.populateTree(folderInfo, source);
			}
		});
	},

	__findDeepItem (id) {
		const deepTree = this.state.treeNodesDeep;
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

	__setItemState (item, state) {
		const itemState = this.accessors.getItemState(item);
		const itemStates = this.state.itemStates;
		const id = item.get('id');

		if (!id) {
			throw new Error('A unique id is required!');
		}

		Lib.extend(itemState, state);
		itemStates[id] = itemState;
		this.setState({itemStates});
	},

	__selectItem (item) {
		const itemStates = this.state.itemStates;

		if (!this.state.multiSelect) {
			this.__setItemState(item, {selected: true});
			Object.keys(itemStates).forEach(itemId => {
				if (itemId !== item.get('id').toString()) { // Need a toString here because itemId is an object literal key, and therefore a string.
					this.__setItemState(itemStates[itemId].item, {selected: false});
				}
			});
		} else {
			const currentItemState = this.accessors.getItemState(item);
			currentItemState.selected = !currentItemState.selected;
			this.__setItemState(item, currentItemState);
		}
	},

	__toggleFolder (folder) {
		this.__setItemState(folder, {open: !this.accessors.getItemState(folder).open});
	},

	getSelectedItems () {
		const itemStates = this.state.itemStates;
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

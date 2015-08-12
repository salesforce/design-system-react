// TREE CONTROL

import * as Lib from './lib';
import Base from './base';

export const CONTROL = 'tree';

const TreeCore = Lib.extend({}, Base, {
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
			multiSelect: false
		};
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

	__toggleItem (item) {
		item._state.selected = !item._state.selected;

		this.__setState(this._state);
	},

	__selectFolder (folder) {
		if (Lib.isFunction(this.selectFolder)) {
			if (this.options.folderSelect) {
				this.__setState({ selectedItems: folder });
				this.selectFolder(folder);
			} else {
				this.selectFolder(folder);
			}
		}
	},

	__toggleFolder (folder) {
		folder._state.open = !folder._state.open;

		if (folder._state.populated) {
			this.__setState(this._state);
		} else {
			this.__retrieveData(folder);
		}
	},

	getSelectedItems () {
		const allItems = this.__getState('treeNodes');
		const selectedItems = [];

		allItems.forEach((selectedItem) => {
			if (selectedItem._state.selected) {
				selectedItems.push(selectedItem);
			}
		});

		return selectedItems;
	},
	
	enable () {
		this.__setState({ disabled: false });
		if (Lib.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.__setState({ disabled: true });
		if (Lib.isFunction(this.onDisabled)) this.onDisabled();
	}

});

export default TreeCore;

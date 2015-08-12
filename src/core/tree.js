// TREE CONTROL

import Landmark from '../landmark';
import Base from './base';
import classNames from 'classnames';

export var CONTROL = 'tree';

var TreeCore = Object.assign({}, Base, {
	// CSS classes used within this control
	_cssClasses: {
		CONTROL: CONTROL
	},

	//options
	/*
	 cacheItems: false,
	 disabled: false,
	 dataSource: null,
	 folderSelect: false,
	 itemSelect: false,
	 multiSelect: false
	 */

	// Set the defaults
	__getInitialState () {
		return {
			//could be several selected items
			treeNodes: [], //contains all tree data in a flat format
			treeNodesDeep: [], //deep data structure for tree
			disabled: false
		};
	},

	__initializeOptions (options) {

		this.dataSource = function (parentData, callback) {

			callback({
				data: [
					{
						"name": "Ascending and Descending",
						"type": "folder",
						"attr": {
							"id": "folder1"
						}
					},
					{
						"name": "Sky and Water I (with custom icon)",
						"type": "item",
						"attr": {
							"id": "item1",
							"data-icon": "glyphicon glyphicon-file"
						}
					},
					{
						"name": "Drawing Hands",
						"type": "folder",
						"attr": {
							"id": "folder2"
						}
					}]
			});

		};

		/*if ( Landmark.isFunction(options.dataSource) ) {
			this.dataSource = options.dataSource;
		}*/

	},

	__retrieveData (folderInfo) {
		var self = this;

		//store this data in a flat structure
		 /*
		{
		    text: '',
		    type: 'folder', //'item'
		    attr: {} //or whatever the user wants
		    _id: '' //assign an id when data is retrieved
		    _parent: '' //assign a parent to that
		    _children: []
		}
		 */

		this.dataSource(folderInfo ? folderInfo : {}, function (source) {
			var currentNodesState = self.__getState('treeNodes');
			var stateData = {}, currentDeepItem;

			if( folderInfo ){
				currentDeepItem = self.__findDeepItem(folderInfo._id);
			}

			if(source.data && source.data.length) {
				//Adding unique identifiers
				source.data.forEach(function(nodeData){
					nodeData._id = Symbol();
					nodeData._parent = folderInfo ? folderInfo._id : null;
					nodeData._state = {
						selected: false,
						open: false,
						loading: false,
						populated: false
					}
				});

				if( currentDeepItem ) {
					//but what if they have children of their own. Keep that in mind for later
					currentDeepItem._children = source.data;
					currentDeepItem._state.open = true;
					currentDeepItem._state.populated = true;
				} else {
					stateData.treeNodesDeep = source.data
				}

				stateData.treeNodes = currentNodesState.concat(source.data);

				self.__setState(stateData);
				if (Landmark.isFunction(self.populateTree)) self.populateTree(folderInfo, source);
			}
		});
	},

	__findItem (id) {

	},

	__findDeepItem (id) {
		var deepTree = this.__getState('treeNodesDeep');
		var find = (treeItems) => {
			var foundItem;

			treeItems.forEach( (treeItem) => {
				if( id === treeItem._id ){
					return foundItem = treeItem;
				} else if ( treeItem._children && treeItem._children.length ) {
					return foundItem = find(treeItem._children);
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

		if( Landmark.isFunction(this.selectFolder) ){
			//Sometimes folder selection is disabled
			//this.options.folderSelect
			if( this.options.folderSelect ){
				this.__setState({ selectedItems: folder });
				this.selectFolder(folder);
			} else {
				this.selectFolder(folder);
			}
		}
	},

	__toggleFolder (folder) {

		folder._state.open = !folder._state.open;

		if( folder._state.populated ) {
			this.__setState(this._state);
		} else {
			this.__retrieveData(folder);
		}
	},

	getSelectedItems () {
		var allItems = this.__getState('treeNodes');
		var selectedItems = [];

		allItems.forEach( (selectedItem) => {
			if( selectedItem._state.selected ){
				selectedItems.push(selectedItem);
			}
		});

		return selectedItems;
	},

	// These methods make sense for jQuery components but much less sense for React components
	// TO-DO: Should methods that don't make sense for a particular facade be overidden with warnings?
	enable () {
		this.__setState({ disabled: false });
		if (Landmark.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.__setState({ disabled: true });
		if (Landmark.isFunction(this.onDisabled)) this.onDisabled();
	}

});

export default TreeCore;
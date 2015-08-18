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
			disabled: false,
			folderSelect: false,
			multiSelect: false,
			autoOpen: false,
			autoOpenLimit: 1
		};
	},

	_initializeOptions (options) {
		if (options && options.collection) {
			this._collection = Lib.getDataAdapter(options.collection);
		} else if (!this._collection) {
			this._collection = Lib.getDataAdapter([]);
		}

		this._initializeDisableable(options);
		
		this.setStore({
			folderSelect: options.folderSelect,
			multiSelect: options.multiSelect,
			autoOpen: options.autoOpen,
			autoOpenLimit: options.autoOpenLimit
		});
	},

	accessors: {
		getText (item) {
			return item.get('text');
		},

		// May return either a promise or a value
		getChildren (item) {
			return item.get('children');
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

		// Reduce the number of fields here if a unique key is available
		// Result can be either an object with key/value pairs to match or a function
		getKey (item) {
			return item.get();
		},
		
		getId (item) {
			return item.get('id');
		}
	},
	
	// Proxy this call to the accessor to ensure that we always receive a promise wrapped in a Data Adapter
	_getChildren (item) {
		return Promise.resolve(this.accessors.getChildren(item)).then(Lib.getDataAdapter);
	},
	
	// TO-DO: We can probably pull this multi-select logic out to a trait
	getSelectedItems () {
		return this.getStore('selection');
	},
	
	_isItemSelected (item, selection) {
		const _selection = selection || Lib.getDataAdapter(this.getSelectedItems());
		return !!_selection.findWhere(this.accessors.getKey(item));
	},
	
	_selectItem (item) {
		const selection = Lib.getDataAdapter(this.getSelectedItems());
		
		if (!this._isItemSelected(item, selection) && (!Lib.isFunction(this._canSelect) || this._canSelect(item))) {
			if (this.getStore('multiSelect')) {
				selection.add(item);
			} else {
				selection.reset(item);
			}
			
			this.setStore({ selection: selection._data });
			if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
			
			this.trigger('changed', item._item, selection._data);
		}
	},
	
	selectItem (_item) {
		this._selectItem(Lib.getItemAdapter(_item));
	},
	
	_deselectItem (item) {
		const selection = Lib.getDataAdapter(this.getSelectedItems());
		
		if (this._isItemSelected(item, selection)) {
			selection.remove(item);
			
			this.setStore({ selection: selection._data });
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
			
			this.trigger('changed', selection._item, selection._data);
		}
	},
	
	deselectItem (_item) {
		this._deselectItem(Lib.getItemAdapter(_item));
	},

	deselectAll () {
		const selection = Lib.getDataAdapter(this.getSelectedItems());
		
		selection.reset(null);
		
		this.setStore({ selection: selection._data });
		if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
			
		this.trigger('changed', null, selection._data);
	},
	
	// TO-DO: This beginning code is basically the same as multi-select right now
	getOpenFolders () {
		return this.getStore('open');
	},
	
	_isFolderOpen (folder, open) {
		const _open = open || Lib.getDataAdapter(this.getOpenFolders());
		return !!_open.findWhere(this.accessors.getKey(folder));
	},
	
	_toggleFolder (folder) {
		const open = Lib.getDataAdapter(this.getOpenFolders());
		const isOpen = this._isFolderOpen(folder, open);
		let eventName;
		
		if (isOpen) {
			open.remove(folder);
			eventName = 'closed';
		} else {
			open.add(folder);
			eventName = 'opened';
		}
		
		this.setStore({ open: open._data });
		if (Lib.isFunction(this._onFolderToggled)) this._onFolderToggled(folder, !isOpen);
		
		this.trigger(eventName, folder._item, open._data);
	},
	
	toggleFolder (_folder) {
		this._toggleFolder(Lib.getItemAdapter(_folder));
	},

	closeAllFolders () {
		const open = Lib.getDataAdapter(this.getOpenFolders());
		
		open.reset(null);

		this.setStore({ open: open._data });
		if (Lib.isFunction(this._onFoldersClosed)) this._onFoldersClosed();

		this.trigger('closed', null, open._data);
	}
});

export default TreeCore;

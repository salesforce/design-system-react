// TREE CONTROL

import * as Lib from './lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Multiselectable from '../traits/multiselectable';

export const CONTROL = 'tree';

const TreeCore = Lib.extend({}, Base, Disableable, Multiselectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		folderSelect: false,
		multiSelect: false,
		autoOpen: false,
		autoOpenLimit: 1
	},

	_initializer (options) {
		if (options && options.collection) {
			this._collection = Lib.getDataAdapter(options.collection);
		} else if (!this._collection) {
			this._collection = Lib.getDataAdapter([]);
		}
		
		this.setProperties(options);
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
			return item.get('_isExpandable') !== false;
		},

		// Reduce the number of fields here if a unique key is available
		// Result can be either an object with key/value pairs to match or a function
		getKey (item) {
			return { id: item.get('id') };
		},
		
		getId (item) {
			return item.get('id');
		}
	},
	
	// Proxy this call to the accessor to ensure that we always receive a promise wrapped in a Data Adapter
	_getChildren (item) {
		return Promise.resolve(this.accessors.getChildren(item)).then(Lib.getDataAdapter);
	},
	
	_canSelect (item) {
		return this.accessors.getType(item) === 'item' || this.getProperty('folderSelect');
	},
	
	// TO-DO: This beginning code is basically the same as multi-select right now
	getOpenFolders () {
		return this.getProperty('open');
	},
	
	_getOpenFolders () {
		return Lib.getDataAdapter(this.getProperty('open')).clone();
	},
	
	_isFolderOpen (folder, open) {
		const _open = open || Lib.getDataAdapter(this.getOpenFolders());
		return !!_open.findWhere(this.accessors.getKey(folder));
	},
	
	_canOpen (folder) {
		return this.accessors.getExpandable(folder);
	},
	
	_toggleFolder (folder, options) {
		if (this._canOpen(folder)) {
			const open = this._getOpenFolders();
			const isOpen = this._isFolderOpen(folder, open);
			const silent = options && options.silent;
			let eventName;
			
			if (isOpen) {
				open.remove(folder);
				eventName = 'closed';
			} else {
				open.add(folder);
				eventName = 'opened';
			}
			
			this.setProperties({ open: open._data });
			if (!silent && Lib.isFunction(this._onFolderToggled)) this._onFolderToggled(folder, !isOpen);
			
			this.trigger(eventName, folder._item, open._data);
		}
	},
	
	toggleFolder (_folder) {
		this._toggleFolder(Lib.getItemAdapter(_folder));
	},

	closeAllFolders () {
		const open = this._getOpenFolders();
		
		open.reset(null);

		this.setProperties({ open: open._data });
		if (Lib.isFunction(this._onFoldersClosed)) this._onFoldersClosed();

		this.trigger('closed', null, open._data);
	}
});

export default TreeCore;

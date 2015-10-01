// TREE CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Multiselectable from '../traits/multiselectable';

export const CONTROL = 'tree';

const TreeCore = Lib.merge({}, Base, Disableable, Multiselectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		collection: [],
		folderSelect: false,
		multiSelect: false,
		autoOpen: false,
		autoOpenLimit: 1
	},

/* Accessors: These may be supplied in the options hash to override default behavior

getText (item)
	Return the text value to display as the branch or item name
	item => object wrapped in an Item Adapter

getChildren (item)
	Return the children of the specified item
	May return either an array / collection that is supported by Data Adapters, or a promise the resolves as such
	item => object wrapped in an Item Adapter
	
getType (item)
	Return the type of the current node - either 'folder' (for branches) or 'item'
	item => object wrapped in an Item Adapter
	
getIconClass (item)
	Return an (optional) class name that can be used to override the icon
	item => object wrapped in an Item Adapter
	
getExpandable (item)
	For branches, returns whether or not the branch is expandable (generally, whether it has children)
	item => object wrapped in an Item Adapter
	
getKey (item)
	Return either an object with key/value pairs to match or a match function
	Use this to reduce the number of fields required for searching if a unique key is available
	item => object wrapped in an Item Adapter
	
getId (item)
	Return a unique value for each node
	item => object wrapped in an Item Adapter
	
*/

	accessors: {
		getText (item) {
			return item.get('text');
		},

		getChildren (item) {
			return item.get('children');
		},

		// Proxy this call to the public accessor to ensure that we always receive a promise wrapped in a Data Adapter
		_getChildren (item) {
			return Promise.resolve(item.getChildren()).then(Lib.bind(this._getDataAdapter, this));
		},

		getType (item) {
			// FIXME Set a reasonable default or throw an error for "item-ish" items that don't gave a type defined
			return item.get('_itemType');
		},

		getIconClass (item) {
			return item.get('_iconClass');
		},

		getExpandable (item) {
			return item.get('_isExpandable') !== false;
		},

		getKey (item) {
			return { id: item.get('id') };
		},
		
		getId (item) {
			return item.get('id');
		}
	},

	_canSelect (item) {
		return item.getType() === 'item' || !!this.getProperty('folderSelect');
	},
	
	// TO-DO: This beginning code is basically the same as multi-select right now
	getOpenFolders () {
		return this.getProperty('open');
	},
	
	_getOpenFolders () {
		return this._getDataAdapter(this.getOpenFolders()).clone();
	},
	
	_isFolderOpen (folder, open) {
		const _open = open || this._getDataAdapter(this.getOpenFolders());
		return !!_open.findWhere(folder.getKey());
	},
	
	_canOpen (folder) {
		return folder.getExpandable();
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
		this._toggleFolder(this._getItemAdapter(_folder));
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

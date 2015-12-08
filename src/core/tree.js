// # Tree Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'Tree';

const TreeCore = Lib.merge({}, Base, Disableable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-tree',
		CONTAINER: 'slds-tree-container'
	},

	// Set the defaults
	_defaultProperties: {
		collection: [],
		folderSelect: false,
		multiSelect: false,
		autoOpen: false,
		autoOpenLimit: 1
	},

	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
	accessors: {
		// Return the text value to display as the branch or item name.
		getText (item) {
			return item.get('text');
		},

		// Return the children of the specified item. May return either an array / collection that is supported by Data Adapters, or a promise the resolves as such.
		getChildren (item) {
			return item.get('children');
		},

		// Proxy this call to the public accessor to ensure that we always receive a promise wrapped in a Data Adapter
		_getChildren (item) {
			/* TODO: Right now we are using `Lib.bind` here to avoid React yelling about double-binding this function. A better solition should be found */
			return Promise.resolve(item.getChildren()).then(Lib.bind(this._getDataAdapter, this));
		},

		// Return the type of the current node - either 'folder' (for branches) or 'item'.
		getType (item) {
			// FIXME: Set a reasonable default or throw an error for "item-ish" items that don't have a type defined
			return item.get('_itemType');
		},

		// Return an (optional) class name that can be used to override the icon.
		getIconClass (item) {
			return item.get('_iconClass');
		},

		// For branches, returns whether or not the branch is expandable (generally, whether it has children).
		getExpandable (item) {
			return item.get('_isExpandable') !== false;
		},

		// Return either an object with key/value pairs to match or a match function. Use this to reduce the number of fields required for searching if a unique key is available.
		getKey (item) {
			return { id: item.get('id') };
		},

		// Return a unique value for each node.
		getId (item) {
			return item.get('id');
		}
	},

	_canSelect (newSelection, select) {
		const folderSelect = !!this.getProperty('folderSelect');
		let canSelect = true;
		
		newSelection.forEach((item) => {
			canSelect = canSelect && (folderSelect || item.getType() === 'item');
		});
		
		if (canSelect) {
			select();
		}
	},

	// TODO: This beginning code is basically the same as multi-select right now
	getOpenFolders () {
		return this.getProperty('open');
	},

	getClosedFolders () {
		return this.getProperty('open');
	},

	_getOpenFolders () {
		return this._getDataAdapter(this.getOpenFolders()).clone();
	},

	_getClosedFolders () {
		return this._getDataAdapter(this.getClosedFolders()).clone();
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
				open.remove(folder._item);
				eventName = 'closed';
			} else {
				open.add(folder._item);
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

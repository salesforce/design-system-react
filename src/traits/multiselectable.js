// # Multiselectable
// ### Trait

// Traits are inherited (typically at the `core` level) by other controls and provide functionality and consistency of APIs. Multiselectable, in particular, is a set of methods designed to deal with managing a set of items that have been selected out of a collection.

// Note that you should use multiselectable when you have discrete items or groups of items. For example, multiple _dates_ would be a good use case for multiselectable, while a single _date range_ is probably only a single selection. If, however, it's possible to select multiple date ranges then you're back to multiselectable again.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

const Multiselectable = {
	// Because traits are mixed in via merge, objects like `cssClasses` may be present in eact trait, the control base, and the control facades, and the final object will contain all of the unique classes. This allows traits to bring classes with them.
	cssClasses: {
		'NOT_SELECTED': 'slds-not-selected'
	},

	// This is an API method which exposes the current selection. Not every framework relies on API methods, but it is available for consistency between those that do. Note that every facade provides a set of state management methods: `getProperty`, `setProperties`, `getState`, and `setState`. You can read the `state.js` helper in the framework you are working in to see how the facade for that framework handles these.
	getSelectedItems () {
		return this.getProperty('selection');
	},

	// The internal version of `getSelectedItems`. You can always access the raw selection yourself, of course, this method just wraps it in a `dataAdapter` for you so that you get the benefit of supporting multiple frameworks. It also clones the selection so that a selection passed in by reference won't be mutated.
	_getSelectedItems () {
		const selection = this.getSelectedItems();
		
		if (selection) {
			return this._getDataAdapter(selection).clone();
		}
		
		// If no selection exists, we'll currently provide an empty array to start building one. This may change, however, as it's not the cleanest pattern.
		return this._getDataAdapter([]);
	},
	
	// Accepts an item from the collection (wrapped in an item adapter) and compares it to the existing selection to determine if it has already been selected. If a `getKey` accessor has been provided that will be used instead of the item itself.
	_isItemSelected (item, selection) {
		const _selection = selection || this._getDataAdapter(this.getSelectedItems());
		const key = Lib.isFunction(item.getKey) ? item.getKey() : item._item;
		return !!_selection.findWhere(key);
	},

	// Take a set of items (most likely a new selection) and return only those which are not already part of the selection.
	_getNotSelectedItems (items, selection) {
		return items.filter((item) => {
			return !this._isItemSelected(item, selection);
		});
	},
	
	// Take a set of items (most likely a new selection) and return only those which are  already part of the selection.
	_getPreviouslySelectedItems (items, selection) {
		return items.filter((item) => {
			return this._isItemSelected(item, selection);
		});
	},
	
	// Take a set of items and select any that aren't yet selected.
	_selectItems (items, selectIndex) {
		const selection = this._getSelectedItems();
		const itemsToSelect = this._getNotSelectedItems(items, selection);

		// The main selection logic happens in this method. Controls may optionally declare a `_canSelect` method and if they do this will be passed to them as a callback. If they don't it will executed immediately.
		const _select = Lib.bind(function _select () {
			// Multiselectable supports both single and multiple selection based on the `multiSelect` boolean option. That is, _controls_ that make use of the multiselectable trait support multiple selection, but that doesn't mean that an instance of one of thoe controls has to.
			if (this.getProperty('multiSelect')) {
				if (Lib.isNumber(selectIndex)) {
					selection.add(itemsToSelect, { at: selectIndex });
				} else {
					selection.add(itemsToSelect);
				}
			} else {
				selection.reset(itemsToSelect);
			}

			// Call optional internal lifecycle methods before and after selection. Some facades will make use of these to perform rendering or other tasks.
			if (Lib.isFunction(this._onBeforeSelect)) this._onBeforeSelect(selection);
			
			// Every facade must provide the `setProperties` state management method, but what they do with it can vary. For example, in the React facade **this actually does nothing**, as the expectation is that controls won't change their own properties and will instead wait for a state change at some level above themselves.
			this.setProperties({ selection: selection._data });

			// Every facade must also provide a `trigger` method for event handling. In this case we are triggering two "events" - both a `changed` event that fires for selection _and_ deselection, and a `selected` event that fires only for selection. It's important to note that exactly how these events bubble up will depend on how a particular framework typically works. They might be thrown on the control itself, on a DOM element tied to the control, or even called as a callback instead of as an event. You can read the `events.js` helper in the framework you are working in to see how the facade for that framework handles events.
			this.trigger('changed', itemsToSelect, selection._data);
			this.trigger('selected', itemsToSelect, selection._data);
			
			if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
		}, this);

		// We only need to move forward if we actually have items to select. If we do, check for the `_canSelect` method.
		if (itemsToSelect.length > 0) {
			if (!Lib.isFunction(this._canSelect)) {
				_select();
			} else {
				this._canSelect(this._getDataAdapter(itemsToSelect), _select);
			}
		}
	},

	// Delegate calls for single items wrapped in an item adapter to the public method (since we really only support arrays).
	_selectItem (item, index) {
		this.selectItem(item._item, index);
	},

	// Public API method for selection multiple items.
	selectItems (items, index) {
		this._selectItems(this._getDataAdapter(items), index);
	},

	// Public API method for selection a single item.
	selectItem (_item, index) {
		this.selectItems([_item], index);
	},

	// Deselection works essentially the same way as selection.
	_deselectItems (items) {
		const selection = this._getSelectedItems();
		const itemsToDeselect = this._getPreviouslySelectedItems(items, selection);
		
		const _deselect = Lib.bind(function _deselect () {
			selection.remove(itemsToDeselect);

			if (Lib.isFunction(this._onBeforeDeselect)) this._onBeforeDeselect(selection);

			this.setProperties({ selection: selection._data });
			
			this.trigger('changed', itemsToDeselect, selection._data);
			this.trigger('deselected', itemsToDeselect, selection._data);
			
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
		}, this);
		
		if (itemsToDeselect.length > 0) {
			if (!Lib.isFunction(this._canDeselect)) {
				_deselect();
			} else {
				this._canDeselect(this._getDataAdpater(itemsToDeselect), _deselect);
			}
		}
	},

	_deselectItem (item) {
		this.deselectItem(item._item);
	},

	deselectItems (items) {
		this._deselectItems(this._getDataAdapter(items));
	},

	deselectItem (_item) {
		this.deselectItems([_item]);
	},

	// Quickly empty the selection of all items.
	deselectAll () {
		const selection = this._getSelectedItems();
		
		selection.reset(null);

		if (Lib.isFunction(this._onBeforeDeselect)) this._onBeforeDeselect(selection);

		this.setProperties({ selection: selection._data });
		
		this.trigger('changed', null, selection._data);
		this.trigger('deselected', null, selection._data);
		
		if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
	},
	
	toggleItem (_item) {
		if (this._isItemSelected(this._getItemAdapter(_item))) {
			this.deselectItem(_item);
		} else {
			this.selectItem(_item);
		}
	}
};

export default Multiselectable;

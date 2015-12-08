// # Multiselectable
// ### Trait

// Traits are inherited (typically at the `core` level) by other controls and provide functionality and consistency of APIs. Multiselectable, in particular, is a set of methods designed to deal with managing a set of items that have been selected out of a collection.

// Note that you should use Multiselectable when you have discrete items or groups of items. For example, multiple _dates_ would be a good use case for Multiselectable, while a single _date range_ is probably only a single selection. If, however, it's possible to select multiple date ranges then you're back to Multiselectable again.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

const Multiselectable = {
	// The internal version of `getSelectedItems`. You can always access the raw selection yourself, of course, this method just wraps it in a `dataAdapter` for you so that you get the benefit of supporting multiple frameworks. It also clones the selection so that a selection passed in by reference won't be mutated.
	getWrappedImmutableData (controlContext, data) {
		if (data) {
			return controlContext._getDataAdapter(data).clone();
		}
		
		// If no selection exists, we'll currently provide an empty array to start building one. This may change, however, as it's not the cleanest pattern.
		return controlContext._getDataAdapter([]);
	},
	
	// Accepts an item from the collection (wrapped in an item adapter) and compares it to the existing selection to determine if it has already been selected. If a `getKey` accessor has been provided that will be used instead of the item itself.
	isItemSelected (item, selection) {
		const key = Lib.isFunction(item.getKey) ? item.getKey() : item._item;
		return !!selection.findWhere(key);
	},

	// Take a set of items (most likely a new selection) and return only those which are not already part of the selection.
	getNotSelectedItems (items, selection) {
		return items.filter((item) => {
			return !Multiselectable.isItemSelected(item, selection);
		});
	},
	
	// Take a set of items (most likely a new selection) and return only those which are  already part of the selection.
	getPreviouslySelectedItems (items, selection) {
		return items.filter((item) => {
			return Multiselectable.isItemSelected(item, selection);
		});
	},
	
	// Take a set of items and select any that aren't yet selected.
	selectItems (controlContext, items, currentSelection, selectIndex) {
		const selection = Multiselectable.getWrappedImmutableData(controlContext, currentSelection);
		const itemsToSelect = Multiselectable.getNotSelectedItems(controlContext._getDataAdapter(items), selection);

		// The main selection logic happens in this method. Controls may optionally declare a `_canSelect` method and if they do this will be passed to them as a callback. If they don't it will executed immediately.
		const _select = () => {
			// Multiselectable supports both single and multiple selection based on the `multiSelect` boolean option. That is, _controls_ that make use of the Multiselectable trait support multiple selection, but that doesn't mean that an instance of one of thoe controls has to.
			if (controlContext.getProperty('multiSelect')) {
				if (Lib.isNumber(selectIndex)) {
					selection.add(itemsToSelect, { at: selectIndex });
				} else {
					selection.add(itemsToSelect);
				}
			} else {
				selection.reset(itemsToSelect);
			}

			// Call optional internal lifecycle methods before and after selection. Some facades will make use of these to perform rendering or other tasks.
			if (Lib.isFunction(controlContext._onBeforeSelect)) controlContext._onBeforeSelect(selection);
			
			// While this method is optional (it's not used by React, for example) most facades will use it to update the selection property.
			if (Lib.isFunction(controlContext._onSelect)) controlContext._onSelect(selection);

			// Every facade must provide a `trigger` method for event handling. In this case we are triggering two "events" - both a `changed` event that fires for selection _and_ deselection, and a `selected` event that fires only for selection. It's important to note that exactly how these events bubble up will depend on how a particular framework typically works. They might be thrown on the control itself, on a DOM element tied to the control, or even called as a callback instead of as an event. You can read the `events.js` helper in the framework you are working in to see how the facade for that framework handles events.
			controlContext.trigger('changed', itemsToSelect, selection._data);
			controlContext.trigger('selected', itemsToSelect, selection._data);
			
			if (Lib.isFunction(controlContext._onSelected)) controlContext._onSelected(selection);
		};

		// We only need to move forward if we actually have items to select. If we do, check for the `_canSelect` method.
		if (itemsToSelect.length > 0) {
			if (!Lib.isFunction(controlContext._canSelect)) {
				_select();
			} else {
				controlContext._canSelect(controlContext._getDataAdapter(itemsToSelect), _select);
			}
		}
	},

	// Public API method for selection a single item.
	selectItem (controlContext, item, currentSelection, index) {
		Multiselectable.selectItems(controlContext, [item], currentSelection, index);
	},

	// Deselection works essentially the same way as selection.
	deselectItems (controlContext, items, currentSelection) {
		const selection = Multiselectable.getWrappedImmutableData(controlContext, currentSelection);
		const itemsToDeselect = Multiselectable.getPreviouslySelectedItems(controlContext._getDataAdapter(items), selection);
		
		const _deselect = () => {
			selection.remove(itemsToDeselect);

			if (Lib.isFunction(controlContext._onBeforeDeselect)) controlContext._onBeforeDeselect(selection);

			// While this method is optional (it's not used by React, for example) most facades will use it to update the selection property.
			if (Lib.isFunction(controlContext._onDeselect)) controlContext._onDeselect(selection);
			
			controlContext.trigger('changed', itemsToDeselect, selection._data);
			controlContext.trigger('deselected', itemsToDeselect, selection._data);
			
			if (Lib.isFunction(controlContext._onDeselected)) controlContext._onDeselected(selection);
		};
		
		if (itemsToDeselect.length > 0) {
			if (!Lib.isFunction(controlContext._canDeselect)) {
				_deselect();
			} else {
				controlContext._canDeselect(controlContext._getDataAdpater(itemsToDeselect), _deselect);
			}
		}
	},

	deselectItem (controlContext, item, currentSelection) {
		Multiselectable.deselectItems(controlContext, [item], currentSelection);
	},

	// Quickly empty the selection of all items.
	deselectAll (controlContext, currentSelection) {
		const selection = Multiselectable.getWrappedImmutableData(controlContext, currentSelection);
		selection.reset(null);

		if (Lib.isFunction(controlContext._onBeforeDeselect)) controlContext._onBeforeDeselect(selection);

		// While this method is optional (it's not used by React, for example) most facades will use it to update the selection property.
		if (Lib.isFunction(controlContext._onDeselect)) controlContext._onDeselect(selection);
		
		controlContext.trigger('changed', null, selection._data);
		controlContext.trigger('deselected', null, selection._data);
		
		if (Lib.isFunction(controlContext._onDeselected)) controlContext._onDeselected(selection);
	},
	
	toggleItem (controlContext, item, currentSelection) {
		if (Multiselectable.isItemSelected(controlContext._getItemAdapter(item), controlContext._getDataAdapter(currentSelection))) {
			Multiselectable.deselectItem(controlContext, item, currentSelection);
		} else {
			Multiselectable.selectItem(controlContext, item, currentSelection);
		}
	}
};

export default Multiselectable;

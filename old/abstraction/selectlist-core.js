	// TO-DO:
	// • Let's add some sort of event framework instead of calling named functions (onSelectionChanged) on the implementations
	// • We're creating the global Landmark namespace here for this example, but in reality that will need to be done elsewhere
	// • I really want to use underscore. Tempted to make it a dependency. For now I'm aliasing it with Landmark

(function (factory) {
	var root = (typeof self == 'object' && self.self == self && self) || (typeof global == 'object' && global.global == global && global);

	if (typeof define === 'function' && define.amd) {
		define(['exports'], function (exports) {
			root.Landmark = factory(root, exports);
		});
	} else if (typeof exports !== 'undefined') {
		factory(root, exports);
	} else {
		root.Landmark = factory(root, {});
	}
}(function (root, Landmark) {
	var Selectlist = Landmark.Selectlist = function () {};
	
	Selectlist.prototype._initialize = function (collection, options) {
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize();
		
		// TO-DO:
		// Decide what functions the collections and models will support (should they expect Backbone-esque APIs?)
		
		this._collection = collection || {};
		this._selection = null;
		
		if (options.initialSelection) {
			this.setSelection(options.initialSelection);
		}
		
		if (options.resize === 'auto') {
			if (Landmark.isFunction(this.resize)) this.resize();
		}
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized();
	};
	
	Selectlist.prototype._setSelection = function (newSelection) {
		// TO-DO:
		// • Handle multi-select
		
		if (this._selection !== newSelection) {
			if (Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this._selection = newSelection;
			if (Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	};
	
	Selectlist.prototype.getSelection = function () {
		return Landmark.findWhere(collection, id: this._selection);
	};
	
	Selectlist.prototype.setSelectionByText = function (text) {
		var item = Landmark.findWhere(collection, text: text);
		
		if (item && item.id) {
			this._setSelection(item.id);
		}
	};
	
	Selectlist.prototype.setSelectionByValue = function (value) {
		// TO-DO: This isn't very DRY yet
		
		var item = Landmark.findWhere(collection, value: value);
		
		if (item && item.id) {
			this._setSelection(item.id);
		}
	};
	
	Selectlist.prototype.setSelectionByIndex = function (index) {
		var item = collection[index];
		
		if (item && item.id) {
			this._setSelection(item.id);
		}
	};
	
	return Selectlist;
}));
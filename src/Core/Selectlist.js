import {Base} from './base';

export var SelectlistCore = Object.assign({}, Base, {
	// CSS classes used within this control
	_cssClasses: {
		CONTROL: 'selectlist',
		SELECTED: 'selected'
	},
	
	// Set the defaults
	__getInitialState () {
		return {
			selection: null,
			disabled: false
		};
	},
	
	// TO-DO: Basically a bunch of if-else blocks. Can this be improved?
	__initializeOptions (options) {
		if (options && options.collection) {
			this._collection = options.collection;
		} else if (!this._collection) {
			this._collection = {};
		}
		
		if (options && this.Landmark.isNumber(options.selection)) {
			this.setSelection({ id: options.selection });
		} else if (options && this.Landmark.isObject(options.selection)) {
			this.setSelection(options.selection);
		} else {
			this.clearSelection();
		}
		
		if (options && options.disabled === true) {
			this.disable();
		} else if (options && options.disabled === false) {
			this.enable();
		}
		
		if (options && options.resize === 'auto') {
			if (this.Landmark.isFunction(this.resize)) this.resize();
		}
	},
	
	__setSelection (newSelection) {
		if (this.__getState('selection') !== newSelection) {
			if (this.Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection(this.__getState('selection'), newSelection);
			this.__setState({ selection: newSelection });
			if (this.Landmark.isFunction(this.onSelected)) this.onSelected(newSelection);
		}
	},
	
	__findWhere (criteria) {
		if (!criteria) {
			return null;
		}
		
		return this.Landmark.findWhere(this._collection, criteria) || null;
	},
	
	getSelection () {
		return this.__findWhere(this.__getState('selection'));
	},
	
	// Pass any combination of key / value pairs
	setSelection (criteria) {
		var item = this.__findWhere(criteria);
		
		return this.__setSelection(item);
	},
	
	// Legacy FuelUX functionality - select by the display text
	setSelectionByName (name) {
		return this.setSelectionByKey({ name: name });
	},
	
	// Legacy FuelUX functionality - select by position
	setSelectionByIndex (index) {
		if (!this._collection) {
			return;
		}
		
		var item = this._collection[index];
		
		return this.__setSelection(item);
	},
	
	clearSelection () {
		this.__setSelection();
	},
	
	// These methods make sense for jQuery components but much less sense for React components
	// TO-DO: Should methods that don't make sense for a particular facade be overidden with warnings?
	enable () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		this.__setState({ disabled: false });
		if (this.Landmark.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		this.__setState({ disabled: true });
		if (this.Landmark.isFunction(this.onDisabled)) this.onDisabled();
	}
});
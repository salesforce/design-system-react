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
		if (!newSelection) {
			this.__setState({ selection: null });
		} else if (this.__getState('selection') !== newSelection.id) {
			if (this.Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this.__setState({ selection: newSelection.id });
			if (this.Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	},
	
	getSelection () {
		return this.Landmark.findWhere(this._collection, {id: this.__getState('selection')});
	},
	
	// Pass any combination of key / value pairs
	setSelection (criteria) {
		var item = this.Landmark.findWhere(this._collection, criteria);
		
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
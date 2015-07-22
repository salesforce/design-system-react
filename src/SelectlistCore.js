import {BaseCore} from './BaseCore';

export var SelectlistCore = Object.assign({}, BaseCore, {
	__getInitialState () {
		return {
			selection: null,
			disabled: false
		};
	},
	
	__initializeOptions (options) {
		if (options && options.collection) {
			this._collection = options.collection;
		}
		
		if (options && options.selection) {
			this.setSelectionByKey('id', options.selection);
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
	
	// CSS classes used within this control
	_cssClasses: {
		CONTROL: 'selectlist',
		SELECTED: 'selected'
	},
	
	getSelection () {
		return this.Landmark.findWhere(this._collection, {id: this.__getState('selection')});
	},
	
	setSelectionByText (text) {
		return this.setSelectionByKey('text', text);
	},
	
	setSelectionByKey (key, value) {
		var criteria = {};
		criteria[key] = value;
		var item = this.Landmark.findWhere(this._collection, criteria);
		
		return this.__setSelection(item);
	},
	
	setSelectionByIndex (index) {
		if (!this._collection) {
			return;
		}
		
		var item = this._collection[index];
		
		return this.__setSelection(item);
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
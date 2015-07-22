import {Landmark} from './Landmark';

export var SelectlistCore = {
	__constructor (options) {
		this.Landmark = Landmark;
		
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		this._collection = options.collection || {};
		this._selection = null;
		
		// CSS classes used within this control
		this._cssClasses = {
			CONTROL: 'selectlist',
			SELECTED: 'selected'
		}
		Object.assign(this._cssClasses, Landmark.cssClasses);

		if (options && options.initialSelection) {
			this.__setSelection(options.initialSelection);
		}
		
		if (options && options.resize === 'auto') {
			if (Landmark.isFunction(this.resize)) this.resize();
		}
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized(options);
	},
	
	__setSelection (newSelection) {
		if (!newSelection) {
			this._selection = null;
		} else if (this._selection !== newSelection.id) {
			if (Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this._selection = newSelection.id;
			if (Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	},
	
	selection () {
		return Landmark.findWhere(this._collection, {id: this._selection});
	},
	
	setSelectionByText (text) {
		return this.setSelectionByKey('text', text);
	},
	
	setSelectionByKey (key, value) {
		var criteria = {};
		criteria[key] = value;
		var item = Landmark.findWhere(this._collection, criteria);
		
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
		this.elements.wrapper.toggleClass(this._cssClasses.disabled, false);
	},

	disable () {
		this.elements.wrapper.toggleClass(this._cssClasses.disabled, true);
	}
};
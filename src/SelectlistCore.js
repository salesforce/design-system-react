import {Landmark} from './Landmark';

export class SelectlistCore {
	constructor (collection, options) {
		this.Landmark = Landmark;
		
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(collection, options);
		
		this._collection = collection || {};
		this._selection = null;
		
		if (options && options.initialSelection) {
			this._setSelection(options.initialSelection);
		}
		
		if (options && options.resize === 'auto') {
			if (Landmark.isFunction(this.resize)) this.resize();
		}
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized();
	}
	
	// TO-DO: Is there a better pattern for this using constants?
	get cssClass () {
		return {
			disabled: 'disabled'
		}
	}
	
	get selection () {
		return Landmark.findWhere(this._collection, {id: this._selection});
	}
	
	_setSelection (newSelection) {
		if (!newSelection || !newSelection.id) {
			this._selection = null;
		} else if (this._selection !== newSelection.id) {
			if (Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this._selection = newSelection.id;
			if (Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	}
	
	setSelectionByText (text) {
		return this.setSelectionByKey('text', text);
	}
	
	setSelectionByKey (key, value) {
		var criteria = {};
		criteria[key] = value;
		var item = Landmark.findWhere(collection, criteria);
		
		return this._setSelection(item);
	}
	
	setSelectionByIndex (index) {
		if (!collection) {
			return;
		}
		
		var item = collection[index];
		
		return this._setSelection(item);
	}
	
	enable () {
		this.elements.wrapper.toggleClass(this.cssClass.disabled, false);
		this.elements.button.toggleClass(this.cssClass.disabled, false); // Why is it neccessary to do this to both elements?
	}

	disable () {
		this.elements.wrapper.toggleClass(this.cssClass.disabled, true);
		this.elements.button.toggleClass(this.cssClass.disabled, true);
	}
};
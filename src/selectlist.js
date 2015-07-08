// This doesn't work, still need to figure out how to do proper named imports
import {Landmark} from "./landmark";

export class Selectlist {
	constructor (collection, options) {
		this.Landmark = Landmark;
		
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize();
		
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
	
	get selection () {
		return Landmark.findWhere(collection, {id: this._selection});
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
		var item = Landmark.findWhere(collection, {text: text});
		
		this._setSelection(item);
	}
	
	setSelectionByValue (value) {
		var item = Landmark.findWhere(collection, {value: value});
		
		this._setSelection(item);
	}
	
	setSelectionByIndex (index) {
		if (!collection) {
			return;
		}
		
		var item = collection[index];
		
		this._setSelection(item);
	}
	
	enable () {
		this.element.toggleClass('disabled', false);
		this.button.toggleClass('disabled', false); // Why is it neccessary to do this to both elements?
	}

	disable () {
		this.element.toggleClass('disabled', true);
		this.button.toggleClass('disabled', true);
	}
};
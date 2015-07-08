// This doesn't work, still need to figure out how to do proper named imports
import {Landmark} from "./landmark";

export class Selectlist {
	constructor (collection, options) {
		this.Landmark = Landmark;
		
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize();
		
		this._collection = collection || {};
		this._selection = null;
		
		if (options && options.initialSelection) {
			this.setSelection(options.initialSelection);
		}
		
		if (options && options.resize === 'auto') {
			if (Landmark.isFunction(this.resize)) this.resize();
		}
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized();
	}
	
	get selection () {
		return Landmark.findWhere(collection, {id: this._selection});
	};
	
	_setSelection (newSelection) {
		// TO-DO:
		// • Handle multi-select
		
		if (!newSelection || !newSelection.id) {
			return;
		}
		
		if (this._selection !== newSelection.id) {
			if (Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this._selection = newSelection.id;
			if (Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	}
	
	setSelectionByText (text) {
		var item = Landmark.findWhere(collection, {text: text});
		
		this._setSelection(item);
	};
	
	setSelectionByValue (value) {
		var item = Landmark.findWhere(collection, {value: value});
		
		this._setSelection(item);
	};
	
	setSelectionByIndex (index) {
		if (!collection) {
			return;
		}
		
		var item = collection[index];
		
		this._setSelection(item);
	};
};
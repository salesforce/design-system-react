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
		} else if (this.collection) {
			this._collection = this.collection;
		} else if (!this._collection) {
			this._collection = [];
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
		
		if (this.Landmark.isFunction(criteria.toJSON)) {
			criteria = criteria.toJSON();
		}
		
		if (this.Landmark.isFunction(this._collection.findWhere)) {
			return this._collection.findWhere(criteria) || null;
		} else {
			return this.Landmark.findWhere(this._collection, criteria) || null;
		}
	},
	
	__each (iteratee) {
		if (this.Landmark.isFunction(this._collection.each)) {
			return this._collection.each(iteratee);
		} else {
			return this.Landmark.each(this._collection, iteratee);
		}
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
		
		var item;
		
		if (this.Landmark.isFunction(_collection.at)) {
			item = this._collection.at(index);
		} else {
			item = this._collection[index];
		}
		
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
	},
	
	// Vanilla js implementation of this to be shared by the libraries
	resize () {
		var self = this;
		var newWidth = 0;
		var sizer = document.createElement('div');
		var width = 0;
		var parent;
		var name;
		
		// TO-DO: We probably need to add the cssClasses library to the core
		sizer.className = 'selectlist-sizer';
		sizer.innerHTML = '<div class="' + this._cssClasses.CONTROL + ' btn-group"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><span class="selected-label"></span><span class="caret"></span></button></div>';
		
		if (this.Landmark.hasClass(document.querySelector('html'), 'fuelux')) {
			parent = document.querySelector('body');
		} else {
			parent = document.querySelector('.fuelux');
		}
		
		if (parent) {
			parent.appendChild(sizer);
		} else {
			return;
		}
		
		// This works great except that we need to remember to check the key for 'None selected' as well once it's internationalized
		
		// This list could be long, we might want to cycle through the collection and find the longest name and just select it,
		// and use that width value. That would make less DOM touches. - @interactivellama

		this.__each(function(item) {
			if (self.Landmark.isFunction(item.get)) {
				name = item.get('name');
			} else {
				name = item.name;
			}
			
			sizer.querySelector('.selected-label').textContent = name;
			newWidth = sizer.querySelector('.' + self._cssClasses.CONTROL).offsetWidth;
			if (newWidth > width) {
				width = newWidth;
			}
		});
		
		parent.removeChild(sizer);
		
		this.__setState({ width: width });
		if (this.Landmark.isFunction(this.resetWidth)) this.resetWidth(width);
	}
});
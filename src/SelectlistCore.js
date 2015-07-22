import {Landmark} from './Landmark';

export var SelectlistCore = {
	_getInitialState () {
		return {
			selection: null,
			disabled: false
		};
	},
	
	__constructor (options) {
		this.Landmark = Landmark;
		
		if (Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize(options);
		
		this._collection = options.collection || {};
		this._state = this._getInitialState();
		
		// CSS classes used within this control
		this._cssClasses = {
			CONTROL: 'selectlist',
			SELECTED: 'selected'
		}
		Object.assign(this._cssClasses, Landmark.cssClasses);

		if (options && options.selection) {
			this.__setSelection(options.selection);
		}
		
		if (options && options.disabled) {
			this.disable();
		}
		
		if (options && options.resize === 'auto') {
			if (Landmark.isFunction(this.resize)) this.resize();
		}
		
		if (Landmark.isFunction(this.onInitialized)) this.onInitialized(options);
	},
	
	__setState (values) {
		Object.assign(this._state, values);
		
		if (this.setState) {
			this.__setState = this.setState;
			this.__setState(this._state);
		}
	},
	
	__getState (key) {
		if (!key) return this.state || this._state;
		if (Landmark.isObject(this.state)) return this.state[key];
		if (Landmark.isObject(this._state)) return this._state[key];
		return null;
	},
	
	__setSelection (newSelection) {
		if (!newSelection) {
			this.__setState({ selection: null });
		} else if (this.__getState('selection') !== newSelection.id) {
			if (Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
			this.__setState({ selection: newSelection.id });
			if (Landmark.isFunction(this.onSelected)) this.onSelected();
		}
	},
	
	getSelection () {
		return Landmark.findWhere(this._collection, {id: this.__getState('selection')});
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
		this.elements.wrapper.toggleClass(this._cssClasses.DISABLED, false);
		this.setState({ disabled: false });
		if (Landmark.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.elements.wrapper.toggleClass(this._cssClasses.DISABLED, true);
		this.setState({ disabled: true });
		if (Landmark.isFunction(this.onDisabled)) this.onDisabled();
	}
};
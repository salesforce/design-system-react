// DOM - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

const $ = Lib.global.jQuery || Lib.global.$;

const DOM = {
	_onBeforeInitialize (options) {
		this.elements = {};
		
		if (options.wrapper) {
			this.appendTo(options.wrapper);
			delete options.wrapper;
		}
	},
	
	_onInitialized () {
		if (Lib.isFunction(this._onBeforeRender)) this._onBeforeRender();
		
		if (!this.rendered) {
			if (Lib.isFunction(this._render)) this._render();
			this.rendered = true;
		}
		
		if (Lib.isFunction(this._addToDOM)) this._addToDOM();
		
		if (Lib.isFunction(this._onRendered)) this._onRendered();
	},
	
	appendTo (wrapper) {
		this.elements.wrapper = $(wrapper);
		
		if (this.rendered) {
			this.element.appendTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.appendTo, this, wrapper);
		}
		
		return this;
	},
	
	prependTo (wrapper) {
		this.elements.wrapper = $(wrapper);
		
		if (this.rendered) {
			this.element.prependTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.prependTo, this, wrapper);
		}
		
		return this;
	},
	
	on () {
		if (this.element) {
			this.element.on.apply(this.element, arguments);
		}
		
		return this;
	}
	
	// Possibly add a destroy method
};

export default DOM;

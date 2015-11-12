// DOM - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

const $ = Lib.global.jQuery || Lib.global.$;

const DOM = {
	// `_onBeforeInitialize` is an optional lifecycle event that individual controls / facades may choose to implement. During this step the options are still available and still free to be modified. Initial state can be set here.
	_onBeforeInitialize (options) {
		this.elements = {};
		
		if (options.wrapper) {
			this.appendTo(options.wrapper);
			delete options.wrapper;
		}
	},
	
	// `_onInitialized` is an beginning of lifecycle event that may be overwritten by individual controls.
	_onInitialized () {
		if (Lib.isFunction(this._onBeforeRender)) this._onBeforeRender();
		
		if (!this.rendered) {
			if (Lib.isFunction(this._render)) this._render();
			this.rendered = true;
		}
		
		if (Lib.isFunction(this._addToDOM)) this._addToDOM();
		
		if (Lib.isFunction(this._onRendered)) this._onRendered();
	},
	
	destroy () {
		// `_onDestroy` is an optional end of lifecycle event that individual controls / facades may choose to implement.
		if (Lib.isFunction(this._onDestroy)) return this._onDestroy();
		
		this.element.remove();
		return this.element[0].outerHTML;
	},
	
	// `appendTo` is similar to jQuery's `appendTo()` and appends the control to the DOM node or jQuery element passed. See [jQuery documentation](http://api.jquery.com/appendto/)
	appendTo (wrapper) {
		this.elements.wrapper = $(wrapper);
		
		if (this.rendered) {
			this.element.appendTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.appendTo, this, wrapper);
		}
		
		return this;
	},
	
	// `prependTo` is similar to jQuery's `prependTo()` and prepends the control to the DOM node or jQuery element passed. See [jQuery documentation](http://api.jquery.com/prependto/).
	prependTo (wrapper) {
		this.elements.wrapper = $(wrapper);
		
		if (this.rendered) {
			this.element.prependTo(this.elements.wrapper);
		} else {
			this._addToDOM = Lib.bind(this.prependTo, this, wrapper);
		}
		
		return this;
	},
	
	// `on` is similar to jQuery's `on()` and is a shortcut to adding an event listener to the primary element. See [jQuery documentation](http://api.jquery.com/on/).
	on () {
		if (this.element) {
			this.element.on.apply(this.element, arguments);
		}
		
		return this;
	}
};

export default DOM;

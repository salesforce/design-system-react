// RADIO CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import Base from '../../core/base';

// Traits
import Disableable from '../../traits/disableable';

// Framework specific
import Events from '../events';
import State from '../state';
import Radio from './radio';


const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './radios-template';

const CONTROL = 'radios';

// Constructor
let Radios = function Radios (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};
	this.radios = this.options.radios.map((radio) => {
		radio.name = this.options.name;
		return new Radio($('<i />'), radio);
	});

	this.rendered = false;
	this.template = $(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const RadiosObject = Lib.merge({}, {
	_bindUIEvents () {
		const self = this;
		this.elements.radios.map( function (radio) {
			radio.on('change', $.proxy(self._handleInputChange, self));
		});
	},

	_handleInputChange (e) {
		let targetI = null;

		this.radios.map( function (radio, i) {
			if (radio.options.value === e.target.value) {
				targetI = i;
			}
		});

		this.check(targetI);
	},

	_onInitialized () {
		this._render();
		this._bindUIEvents();
		// only run if all need disabled. Otherwise it will incorrectly enable explicitly disabled radios on init.
		if (this.getProperty('disabled')) {
			this._onEnabledOrDisabled();
		}
	},

	_initElements ($base, elements) {
		elements.radios = this.radios.map( function (radio) {
			return radio.elements.control;
		} );

		elements.label = $base.find('.' + this.cssClasses.LABEL);

		return elements;
	},

	_render () {
		let $el = this.template.clone();
		const elements = this._initElements($el, this.elements);
		const itag = '<i />';

		elements.label.append(this.getProperty('labelText'));

		$el.find('.' + this.cssClasses.CONTROL).append(elements.radios);
		$el = $(itag).append($el);

		elements.wrapper.empty();
		elements.wrapper.append($el.children());

		this.rendered = true;
	},

	_onEnabledOrDisabled () {
		const disabled = this.getProperty('disabled');

		if (disabled) {
			this.elements.wrapper.attr('disabled', 'disabled');
			this.radios.map( function (radio) {
				radio.disable();
			});
		} else {
			this.elements.wrapper.removeAttr('disabled');
			this.radios.map( function (radio) {
				radio.enable();
			});
		}
	},

	toggle (i) {
		if (this.radios[i].checked()) {
			this.uncheck(i);
		} else {
			this.check(i);
		}
	},

	// returns the Radio object at the specified index.
	// UNTESTED EXPERIMENTAL: If you pass in a new radio object, it will set it to the specified index.
	radio (i, radio) {
		if (typeof radio !== 'undefined') {
			radio.on('change', $.proxy(self._handleInputChange, self));
			this.radios[i] = radio;
			this.render();
		} else {
			return this.radios[i];
		}
	},

	check (i) {
		const target = this.radios[i];

		if (target.getProperty('disabled')) {return;}

		// Must set all checked to false first before you set desired checked to true. If you don't, if there is already one set to true further on
		// in the map, it will ignore you trying to set your target to true.
		this.radios.map( function (radio) {
			if (radio.options.value !== target.options.value) {
				radio.uncheck();
			}
		});

		target.check();
	},

	uncheck (i) {
		if (this.radios[i].getProperty('disabled')) {return;}

		this.radios[i].uncheck();
	},

	getChecked () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio;
			}
		}
	},

	getValue () {
		for (const radio of this.radios) {
			if (radio.checked()) {
				return radio.options.value;
			}
		}
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
});

// Merging into prototype
Lib.merge(Radios.prototype, Base, Disableable, Events, State, RadiosObject);

// Framework setup
Radios = Lib.runHelpers('jquery', CONTROL, Radios);

// Exporting
export default Radios;

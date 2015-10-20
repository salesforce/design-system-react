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
		this.syncRadios(e.target.value, true);
	},

	_onInitialized () {
		// TODO: this may have only been applicable for Fuel UX. Is the else even reachable?
		if (!this.rendered) {
			this._render();
		} else {
			// ensuring there were no markup mistakes in regards to state
			this._onEnabledOrDisabled();
			this._onToggled();
		}

		this._bindUIEvents();
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

		this._renderDressings(elements);

		$el.find('.' + this.cssClasses.CONTROL).append(elements.radios);
		$el = $(itag).append($el);

		elements.wrapper.empty();
		elements.wrapper.append($el.children());

		this.rendered = true;
	},

	// TODO: rename this. What are dressings? Maybe something like _buildDOMComponents
	// there is no guidance as to what should be done here and/or why
	_renderDressings (elements) {
		elements.label.append(this.getProperty('labelText'));

		// only run this on init if all need disabled. Otherwise it will incorrectly enable explicitly disabled radios on init.
		if (this.getProperty('disabled')) {
			this._onEnabledOrDisabled();
		}
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

	toggle (i, checked) {
		if (this.radios[i].getProperty('disabled')) {return;}

		this.syncRadios(this.radios[i].options.value, checked);
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
		this.toggle(i, true);
	},

	uncheck (i) {
		this.toggle(i, false);
	},

	getChecked () {
		for (const radio of this.radios) {
			if (radio.isChecked()) {
				return radio;
			}
		}
	},

	getValue () {
		for (const radio of this.radios) {
			if (radio.isChecked()) {
				return radio.options.value;
			}
		}
	},

	/*
	 * ensures that the proper radio is checked
	 *
	 * targetValue - String representing the `value` attribute of the target Radio. We use `targetValue` instead of `i` because when a DOM interaction with
	 *					a Radio occurs, the Radio itself fires this off. Individual Radio components should not know or keep track of their `i` within the
	 *					Radios' map, so we do the finding here based on the Radio's value (which it should and does know)
	 * checkedValue - Boolean to set target Radio's `checked` attribute to.
	 */
	syncRadios (targetValue, checkedValue) {
		// Must set all checked to false first before you set desired checked to true. If you don't, if there is already one set to true further on
		// in the map, it will ignore you trying to set your target to true. You only need to do this if you are setting one to `true`.
		if (checkedValue) {
			this.radios.map( function (radio) {
				if (radio.elements.input.val() !== targetValue) {
					radio.toggle(false);
				}
			});
		}

		this.radios.map( function (radio) {
			if (radio.elements.input.val() === targetValue) {
				radio.toggle(checkedValue);
			}
		});
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

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

const CONTROL = 'radios';

// Constructor
let Radios = function Radios (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};
	this.radios = this.options.radios.map((radio) => {
		return new Radio($('<i />'), radio);
	});

	this.rendered = false;

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
		this.syncRadios(e.target.value);
	},

	_onInitialized () {
		if (!this.rendered) {
			this._render();
		} else {
			// ensuring there were no markup mistakes in regards to state
			this._onEnabledOrDisabled();
			this._onToggled();
		}

		this._bindUIEvents();
	},

	_initElements (elements) {
		elements.radios = this.radios.map( function (radio) {
			return radio.elements.control;
		} );

		return elements;
	},

	_render () {
		let $el = $('');
		const elements = this._initElements(this.elements);
		const itag = '<i />';

		this._renderDressings(elements);

		$el = $(itag).append(elements.radios);

		elements.wrapper.empty();
		elements.wrapper.append($el.children());

		this.rendered = true;
	},

	_renderDressings () {
		this._onEnabledOrDisabled();
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

		this.radios[i].toggle(checked);
		this.syncRadios(this.radios[i].options.value);
	},

	check (i) {
		this.toggle(i, true);
	},

	uncheck (i) {
		this.toggle(i, false);
	},

	// ensures that the proper radio has the `checked` prop/attr
	syncRadios (checkedValue) {
		this.radios.map( function (radio) {
			if (radio.elements.input.val() !== checkedValue) {
				// I'm brute-force setting both of these because at various stages of testing setting just one or the other resulted in a broken radio group
				// The browser (Chrome at least) does not allow you to set `checked` prop/attr to true if there is another one set to true already
				// It just ignores you
				radio.elements.input.prop('checked', false);
				radio.elements.input.removeAttr('checked');
			}
		});

		this.radios.map( function (radio) {
			if (radio.elements.input.val() === checkedValue) {
				radio.elements.input.prop('checked', true);
				radio.elements.input.attr('checked', 'checked');
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

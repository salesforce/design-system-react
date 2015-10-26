// RADIO CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import { CheckboxObject } from '../checkbox/checkbox';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './radio-template';

// Constructor
let Radio = function Radio (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.inputSelector = 'input[type="radio"]';
	this.rendered = false;
	this.template = $('<i />').append(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const RadioObject = Lib.merge({}, CheckboxObject, {
	_defaultProperties: {
		name: ''
	},

	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.check, this));
	},

	// TODO: rename this. What are dressings? Maybe something like _buildDOMComponents
	// there is no guidance as to what should be done here and/or why
	_renderDressings (elements) {
		elements.input.attr('name', this.getProperty('name'));
		CheckboxObject._renderDressings.call(this, elements);
	},

	// TODO: Is this necessary anymore? May never even be reachable now.
	_syncOptions () {
		const name = this.elements.input.attr('name');
		if (name) this.options.name = name;
		CheckboxObject._syncOptions.call(this);
	},

	destroy () {
		const self = this;
		const group = this._getGroup();
		const index = group.findIndex(function (item) {
			return (item === self);
		});

		if (index > -1) group.splice(index, 1);
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
});

// Merging into prototype
Lib.merge(Radio.prototype, RadioCore, Events, State, RadioObject);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;

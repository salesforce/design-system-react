// RADIO CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import { CheckboxObject } from '../checkbox/checkbox';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './radio-template';

// Constructor
let Radio = function Radio () {
	const options = this._getOptions(arguments);
	
	this.inputSelector = 'input[type="radio"]';
	this.template = $('<i />').append(template);
	
	this._initialize(options);
};

// Prototype extension object
const RadioObject = {
	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.check, this));
	},

	// TODO: rename this. What are dressings? Maybe something like _buildDOMComponents
	// there is no guidance as to what should be done here and/or why
	_renderDressings (elements) {
		elements.input.attr('name', this.getProperty('name'));
		CheckboxObject._renderDressings.call(this, elements);
	},

	// TODO: Update this when we add a universal destroy method
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
};

// Merging into prototype
Lib.merge(Radio.prototype, RadioCore, Events, DOM, State, CheckboxObject, RadioObject);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;

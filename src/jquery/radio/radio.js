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

const radioGroups = {};	// declared at this scope to keep a unified list of linked radios

// Constructor
let Radio = function Radio (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.addedToGroup = false;
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

	_getGroup () {
		const name = this.getProperty('name');

		if (!this.addedToGroup) {
			if (!radioGroups[name]) radioGroups[name] = [];
			radioGroups[name].push(this);
			this.addedToGroup = true;
		}

		return radioGroups[name] || [];
	},

	_handleInputChange () {
		this.check();
	},

	_onToggled () {
		if (this.isChecked()) {
			const group = this._getGroup();
			for (let index = 0, length = group.length; index < length; index++) {
				if (group[index] && group[index] !== this) {
					group[index].uncheck();
				}
			}
		}
		CheckboxObject._onToggled.call(this);
	},

	_renderDressings (elements) {
		elements.input.attr('name', this.getProperty('name'));
		CheckboxObject._renderDressings.call(this, elements);
	},

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

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
	this.namespace = 'fu.radio';
	this.rendered = (this.elements.wrapper.find(this.inputSelector).length > 0);
	this.template = $(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const RadioObject = Lib.merge({}, CheckboxObject, {
	_handleInputChange () {
		this.check();
	},

	_onToggled () {
		const self = this;

		if (this.getProperty('checked')) {
			$('input[name="' + this.getProperty('name') + '"]').each(function (index, item) {
				let count = 0;
				let $item = $(item);

				if ($item.is(self.elements.input)) return;

				while (!$item.data(self.namespace) && count < 4) {
					$item = $item.parent();
					count++;
				}

				if ($item.data(self.namespace)) {
					$item.radio('uncheck');
				}
			});
		}

		CheckboxObject._onToggled.call(this);	// TODO: tried super, broke... better syntax for this?
	},

	_renderDressings (elements) {
		elements.input.attr('name', this.getProperty('name'));
		CheckboxObject._renderDressings.call(this, elements);	// TODO: tried super, broke... better syntax for this?
	},

	_syncProperties () {
		this.setProperties({
			name: this.elements.input.attr('name')
		});
		CheckboxObject._syncProperties.call(this);	// TODO: tried super, broke... better syntax for this?
	}
});

// Merging into prototype
Lib.merge(Radio.prototype, RadioCore, Events, State, RadioObject);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;

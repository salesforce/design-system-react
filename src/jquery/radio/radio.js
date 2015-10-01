// RADIO CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import RadioCore, {CONTROL} from '../../core/radio';

// Framework specific
import CheckboxObject from '../checkbox/checkbox';
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

	this.rendered = (this.elements.wrapper.find('input[type="radio"]').length > 0);
	this.template = $(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const RadioObject = Lib.merge(CheckboxObject, {

});

// Merging into prototype
Lib.merge(Radio.prototype, RadioCore, Events, State, RadioObject);

// Framework setup
Radio = Lib.runHelpers('jquery', CONTROL, Radio);

// Exporting
export default Radio;

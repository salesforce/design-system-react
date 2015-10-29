// CHECKBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import CheckboxCore, {CONTROL} from '../../core/checkbox';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './checkbox-template';

// Constructor
let Checkbox = function Checkbox () {
	const options = this._getOptions(arguments);
	
	this.inputSelector = 'input[type="checkbox"]';
	this.template = $('<i />').append(template);
	
	this._initialize(options);
};

// Prototype extension object
export const CheckboxObject = {
	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this.toggle, this));
	},
	
	_initializer () {
		const control = '.' + this.cssClasses.CONTROL;
		this.element = this.$el = this.elements.control = this.template.clone().find(control);
		this.elements.input = this.element.find(this.inputSelector);
		this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
	},

	_render () {
		this.elements.input.attr('value', this.getProperty('value'));
		this.elements.input.attr('checked', this.getProperty('checked'));
		this.elements.label.append(this.getProperty('text'));

		this._onEnabledOrDisabled();
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	},
	
	_onEnabledOrDisabled () {
		const disabled = this.getProperty('disabled');
		const disabledAttr = 'disabled';

		if (disabled) {
			this.elements.input.attr(disabledAttr, disabledAttr);
		} else {
			this.elements.input.removeAttr(disabledAttr);
		}
	},

	_onToggled (checked) {
		this.elements.input.prop('checked', checked);
	}
};

// Merging into prototype
Lib.merge(Checkbox.prototype, CheckboxCore, Events, DOM, State, CheckboxObject);

// Framework setup
Checkbox = Lib.runHelpers('jquery', CONTROL, Checkbox);

// Exporting
export default Checkbox;

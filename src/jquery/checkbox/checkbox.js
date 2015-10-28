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

	_initElements (base, elements) {
		const control = '.' + this.cssClasses.CONTROL;

		elements.control = base.find(control);
		elements.input = $(base.find(this.inputSelector)[0]);
		elements.label = base.find('.' + this.cssClasses.LABEL);

		return elements;
	},
	
	// TODO: rename this. What are dressings? Maybe something like _buildDOMComponents
	// there is no guidance as to what should be done here and/or why
	_renderDressings (elements) {
		elements.input.attr('value', this.getProperty('value'));
		elements.input.attr('checked', this.getProperty('checked'));
		elements.label.append(this.getProperty('text'));

		this._onEnabledOrDisabled();
	},

	_render () {
		const $el = this.template.clone();
		
		const elements = this._initElements($el, this.elements);
		this.element = this.$el = elements.control;
		
		this._renderDressings(elements);

		this.rendered = true;
		
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

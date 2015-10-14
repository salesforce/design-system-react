// CHECKBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import CheckboxCore, {CONTROL} from '../../core/checkbox';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './checkbox-template';

// Constructor
let Checkbox = function Checkbox (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.inputSelector = 'input[type="checkbox"]';
	this.rendered = false;
	this.template = $('<i />').append(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
export const CheckboxObject = {
	_defaultProperties: {
		checked: false,
		disabled: false
	},

	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this._handleInputChange, this));
	},

	_handleInputChange () {
		this.toggle();
	},

	_initElements ($base, elements) {
		const control = '.' + this.cssClasses.CONTROL;

		elements.control = $base.find(control);
		elements.input = $base.find(this.inputSelector);
		elements.label = $base.find('.' + this.cssClasses.LABEL);

		return elements;
	},

	_onBeforeInitialize () {
		if (this.elements.wrapper.find(this.inputSelector).length > 0) {
			this._initElements(this.elements.wrapper, this.elements);
			this._syncOptions(); // syncing options to provided markup
			this.rendered = true;
		}
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

	_onToggled () {
		this.elements.input.prop('checked', this.isChecked());
	},

	_render () {
		let $el = this.template.clone();
		const control = '.' + this.cssClasses.CONTROL;
		const elements = this._initElements($el, this.elements);
		const itag = '<i />';

		this._renderDressings(elements);

		$el = $(itag).append($el.find(control));

		elements.wrapper.empty();
		elements.wrapper.append($el.children());

		this.rendered = true;
	},

	_renderDressings (elements) {
		elements.input.attr('value', this.getProperty('value'));
		elements.input.attr('checked', this.getProperty('checked'));
		elements.input.attr('disabled', this.getProperty('disabled'));
		elements.label.append(this.getProperty('text'));

		this._onEnabledOrDisabled();
	},

	_syncOptions () {
		const opts = {};
		const value = this.elements.input.attr('value') || this.options.value || this._defaultProperties.value;

		if (this.elements.input.prop('disabled')) opts.disabled = true;

		opts.text = this.elements.label.html();
		opts.value = value;

		Lib.extend(this.options, opts);
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
};

// Merging into prototype
Lib.merge(Checkbox.prototype, CheckboxCore, Events, State, CheckboxObject);

// Framework setup
Checkbox = Lib.runHelpers('jquery', CONTROL, Checkbox);

// Exporting
export default Checkbox;

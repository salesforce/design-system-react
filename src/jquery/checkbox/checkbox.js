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
	this.namespace = 'fu.checkbox';
	this.rendered = (this.elements.wrapper.find(this.inputSelector).length > 0);
	this.template = $('<i />').append(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
export const CheckboxObject = {
	_defaultProperties: {
		toggleSelector: ''
	},

	_bindUIEvents () {
		this.elements.input.on('change.' + this.namespace, $.proxy(this._handleInputChange, this));
	},

	_handleInputChange () {
		this.toggle();
	},

	_initElements ($base, elements) {
		const block = '.' + this.cssClasses.BLOCK;
		const control = '.' + this.cssClasses.CONTROL;
		const wrapper = elements.wrapper;

		elements.block = (wrapper.is(block)) ? wrapper : $base.find(block);
		elements.control = (wrapper.is(control)) ? wrapper : $base.find(control);
		elements.input = $base.find(this.inputSelector);
		elements.label = $base.find('.' + this.cssClasses.LABEL);

		return elements;
	},

	_onEnabledOrDisabled () {
		const disabled = this.getProperty('disabled');
		const disabledAttr = 'disabled';

		if (disabled) {
			this.elements.control.addClass(this.cssClasses.DISABLED);
			this.elements.input.attr(disabledAttr, disabledAttr);
		} else {
			this.elements.control.removeClass(this.cssClasses.DISABLED);
			this.elements.input.removeAttr(disabledAttr);
		}
	},

	_onInitialized () {
		if (this.options.checked && !this.getProperty('checkedValue')) {
			this.setProperties({ checkedValue: this.getProperty('value') || '' });
		}

		if (!this.rendered) {
			this._render();
		} else {
			this._initElements(this.elements.wrapper, this.elements);

			// syncing properties to provided markup
			this._syncProperties();

			// ensuring there were no markup mistakes based on state
			this._onEnabledOrDisabled();
			this._onToggled();
		}

		this._bindUIEvents();
	},

	_onToggled () {
		const blank = '';
		const checked = this.isChecked();
		const hidden = 'hidden';
		const toggleSelector = this.getProperty('toggleSelector');

		if (checked) {
			this.elements.control.addClass(this.cssClasses.CHECKED);
			if (toggleSelector !== blank) {
				$(toggleSelector).removeClass(hidden);
			}
		} else {
			this.elements.control.removeClass(this.cssClasses.CHECKED);
			if (toggleSelector !== blank) {
				$(toggleSelector).addClass(hidden);
			}
		}
	},

	_render () {
		let $el = this.template.clone();
		const block = '.' + this.cssClasses.BLOCK;
		const control = '.' + this.cssClasses.CONTROL;
		const elements = this._initElements($el, this.elements);
		const itag = '<i />';

		this._renderDressings(elements);

		if (this.getProperty('addon') || this.getProperty('inline') || elements.wrapper.is(block)) {
			$el = $(itag).append($el.find(control));
		}
		if (elements.wrapper.is(control)) {
			$el = $(itag).append($el.find(control).children());
		}

		elements.wrapper.empty();
		elements.wrapper.append($el.children());

		this.rendered = true;
	},

	_renderDressings (elements) {
		const addon = this.getProperty('addon');
		const value = 'value';

		if (addon) {
			elements.control.addClass(this.cssClasses.ADDON);
		}

		if (this.getProperty('highlight')) {
			elements.block.addClass(this.cssClasses.HIGHLIGHT);
			elements.control.addClass(this.cssClasses.HIGHLIGHT);
		}

		if (this.getProperty('inline') || addon) {
			elements.control.addClass(this.cssClasses.INLINE);
		}

		elements.input.attr(value, this.getProperty(value));
		elements.label.append(this.getProperty('text'));

		this._onEnabledOrDisabled();
		this._onToggled();
	},

	_syncProperties () {
		const value = this.elements.input.attr('value') || this.getProperty('value');

		this.setProperties({
			addon: this.elements.control.hasClass(this.cssClasses.ADDON),
			checkedValue: (this.elements.input.prop('checked')) ? value : this.getProperty('checkedValue'),
			disabled: this.elements.input.prop('disabled') || this.getProperty('disabled'),
			highlight: this.elements.control.hasClass('highlight'),
			inline: this.elements.control.hasClass(this.cssClasses.INLINE),
			text: this.elements.label.html(),
			toggleSelector: this.elements.input.attr('data-toggle') || this.getProperty('toggleSelector'),
			value: value
		});
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

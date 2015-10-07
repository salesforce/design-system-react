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
		toggleSelector: ''
	},

	_bindUIEvents () {
		this.elements.input.on('change', $.proxy(this._handleInputChange, this));
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

	_onBeforeInitialize () {
		if (this.options.checked && !this.options.checkedValue) {
			this.options.checkedValue = this.options.value || this._defaultProperties.value;
			delete this.options.checked;
		}

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
			this.elements.control.addClass(this.cssClasses.DISABLED);
			this.elements.input.attr(disabledAttr, disabledAttr);
		} else {
			this.elements.control.removeClass(this.cssClasses.DISABLED);
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

	_syncOptions () {
		const opts = {};
		const toggleSelector = this.elements.input.attr('data-toggle');
		const value = this.elements.input.attr('value') || this.options.value || this._defaultProperties.value;

		if (this.elements.control.hasClass(this.cssClasses.ADDON)) opts.addon = true;
		if (this.elements.input.prop('checked')) opts.checkedValue = value;
		if (this.elements.input.prop('disabled')) opts.disabled = true;
		if (this.elements.control.hasClass('highlight')) opts.highlight = true;
		if (this.elements.control.hasClass(this.cssClasses.INLINE)) opts.inline = true;
		if (toggleSelector) opts.toggleSelector = toggleSelector;

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

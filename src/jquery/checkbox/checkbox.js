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

	this.rendered = (this.elements.wrapper.find('input[type="checkbox"]').length > 0);
	this.template = $(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
export const CheckboxObject = {
	_defaultProperties: {
		toggleSelector: ''
	},

	_bindUIEvents () {
		this.elements.input.on('change.fu.checkbox', $.proxy(function () { this.toggle(); }, this));
	},

	_initElements ($base, elements) {
		const dot = '.';
		const els = elements || {};

		els.block = ($base.is(dot + this.cssClasses.BLOCK)) ? $base : $base.find(dot + this.cssClasses.BLOCK);
		els.control = ($base.is(dot + this.cssClasses.CONTROL)) ? $base : $base.find(dot + this.cssClasses.CONTROL);
		els.input = $base.find('input[type="checkbox"]');
		els.label = $base.find(dot + this.cssClasses.LABEL);

		return els;
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
			this._initElements(this.elements.wrapper, this.elements);

			// syncing state to provided markup
			this.setProperties({
				addon: this.elements.control.hasClass(this.cssClasses.ADDON),
				checked: this.elements.input.prop('checked'),
				disabled: this.elements.input.prop('disabled'),
				highlight: this.elements.control.hasClass('highlight'),
				inline: this.elements.control.hasClass(this.cssClasses.INLINE),
				text: this.elements.label.html(),
				toggleSelector: this.elements.input.attr('data-toggle'),
				value: this.elements.input.attr('value')
			});

			// ensuring there were no markup mistakes based on state
			this._onEnabledOrDisabled();
			this._onToggled();
		}

		this._bindUIEvents();
	},

	_onToggled () {
		const blank = '';
		const checked = this.getProperty('checked');
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
		const addon = this.getProperty('addon');
		const inline = this.getProperty('inline');
		const elements = this._initElements($el, this.elements);
		const value = 'value';

		if (addon) {
			elements.control.addClass(this.cssClasses.ADDON);
		}

		if (this.getProperty('highlight')) {
			elements.block.addClass(this.cssClasses.HIGHLIGHT);
			elements.control.addClass(this.cssClasses.HIGHLIGHT);
		}

		if (inline || addon) {
			elements.control.addClass(this.cssClasses.INLINE);
		}

		elements.input.attr(value, this.getProperty(value));
		elements.label.append(this.getProperty('text'));

		this._onEnabledOrDisabled();
		this._onToggled();

		if (addon || inline || elements.wrapper.is('.' + this.cssClasses.BLOCK)) {
			$el = elements.control;
		}
		elements.wrapper.empty();
		elements.wrapper.append($el);

		this.rendered = true;
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

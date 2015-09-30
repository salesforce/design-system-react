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
	this.rendered = (this.elements.wrapper.find(this.inputSelector).length > 0);
	this.template = $(template);

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const CheckboxObject = {
	_bindUIEvents () {
		this.elements.input.on('change.fu.checkbox', $.proxy(this._handleInputChange, this));
	},

	_handleInputChange (e) {
		this.toggle($(e.target).prop(this.cssClasses.CHECKED));
	},

	_initElements ($base, elements) {
		const els = elements || {};

		els.block = ($base.is('div.' + this.cssClasses.BLOCK)) ? $base : $base.find('.' + this.cssClasses.BLOCK);
		els.control = $base.find('.' + this.cssClasses.CONTROL);
		els.input = $base.find(this.inputSelector);

		return els;
	},

	_onInitialized () {
		if (!this.rendered) {
			this._render();
		} else {
			this._initElements(this.elements.wrapper, this.elements);
		}

		this._onToggled();

		this._bindUIEvents();
	},

	_onToggled () {
		const checked = this.getProperty('checked');

		if (checked) {
			this.elements.control.addClass(this.cssClasses.CHECKED);
		} else {
			this.elements.control.removeClass(this.cssClasses.CHECKED);
		}
	},

	_render () {
		let $el = this.template.clone();
		const elements = this._initElements($el, this.elements);

		if (this.getProperty('inline')) {
			$el = elements.control;
			elements.control.addClass(this.cssClasses.INLINE);
		}

		if (this.getProperty('highlight')) {
			elements.block.addClass(this.cssClasses.HIGHLIGHT);
			elements.control.addClass(this.cssClasses.HIGHLIGHT);
		}

		// TODO: how would addon be done???

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

// Legacy methods
const legacyMethods = {
};

// Framework setup
Checkbox = Lib.runHelpers('jquery', CONTROL, Checkbox, {
	legacyMethods
});

// Exporting
export default Checkbox;

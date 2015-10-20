// POPOVER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Framework Specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './tooltip-template';

let Tooltip = function Tooltip (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);

	this._initializeState();
	this._initialize(this.options);
};

Lib.merge(Tooltip.prototype, TooltipCore, Events, State, {
	_onInitialized () {
		this._setElementOptions();
		this._setTrigger();

		this._render();

		this.trigger('initialized');
	},

	_render () {
		const body = this.elements.tooltip.find('.slds-tooltip__body');

		if (this.getProperty('content')) {
			body.append( this.getProperty('content') );
		}

		if (this.getProperty('isOpen')) {
			this.elements.tooltip.removeClass('slds-hidden');
		}

		this.elements.tooltip.addClass(this.getClassNames());
		this.elements.container.append(this.elements.tooltip);
	},

	_setElementOptions () {
		const target = this.getProperty('target');
		const container = this.getProperty('container');
		const align = this.getProperty('align');

		this.elements.tooltip = this.template.clone();
		this.elements.target = target ? target : this.elements.wrapper;
		this.elements.container = container ? container : this.elements.wrapper;
		this.elements.align = align ? align : this.elements.target;
	},

	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.target.on( 'click.fu.tooltip', $.proxy(this._toggleTooltip, this));
		} else if (trigger === 'hover') {
			this.elements.target.on( 'mouseover.fu.tooltip', $.proxy(this._toggleTooltip, this));
			this.elements.target.on( 'mouseout.fu.tooltip', $.proxy(this._toggleTooltip, this));
		} else if (trigger === 'focus') {
			this.elements.target.on( 'focus.fu.tooltip', $.proxy(this._toggleTooltip, this));
			this.elements.target.on( 'focusout.fu.tooltip', $.proxy(this._toggleTooltip, this));
		}
	},

	_toggleTooltip () {
		const position = this.getElementAlignment(this.elements.tooltip[0], this.elements.container[0], this.elements.align[0]);
		const isHidden = this.elements.tooltip.hasClass('slds-hidden');
		
		this.elements.tooltip.toggleClass('slds-hidden', !isHidden);
		this.elements.tooltip.css(position);

		if (isHidden) {
			this.elements.tooltip.attr('class', this.getClassNames());

			this.elements.wrapper.trigger('shown.fu.tooltip');
		} else {
			this.elements.wrapper.trigger('hidden.fu.tooltip');
		}
	}
});

const legacyMethods = {
	show () {
		if (this.elements.tooltip.hasClass('slds-hidden')) {
			this._toggleTooltip();
		}
	},

	hide () {
		if (!this.elements.tooltip.hasClass('slds-hidden')) {
			this._toggleTooltip();
		}
	},

	toggle () {
		this._toggleTooltip();
	},

	destroy () {
		this.elements.tooltip.remove();

		return template;
	}
};

Tooltip = Lib.runHelpers('jquery', CONTROL, Tooltip, {
	legacyMethods
});

export default Tooltip;

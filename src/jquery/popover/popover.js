// POPOVER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';

// Framework Specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './popover-template';

let Popover = function Popover (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);

	this._initializeState();
	this._initialize(this.options);
};

Lib.merge(Popover.prototype, PopoverCore, Events, State, {
	_onInitialized () {
		this._setElementOptions();
		this._setTrigger();

		this._render();

		this.trigger('initialized');
	},

	_render () {
		const header = this.elements.popover.find('.slds-popover__header > p');
		const body = this.elements.popover.find('.slds-popover__body');

		if (this.getProperty('header')) {
			header.append( this.getProperty('header') );
		}

		if (this.getProperty('content')) {
			body.append( this.getProperty('content') );
		}

		if (this.getProperty('isOpen')) {
			this.elements.popover.removeClass('slds-hidden');
		}

		this.elements.popover.addClass(this._getClassNames());
		this.elements.container.append(this.elements.popover);
	},

	_setElementOptions () {
		const target = this.getProperty('target');
		const container = this.getProperty('container');
		const align = this.getProperty('align');

		this.elements.popover = this.template.clone();
		this.elements.target = target ? target : this.elements.wrapper;
		this.elements.container = container ? container : this.elements.wrapper;
		this.elements.align = align ? align : this.elements.target;
	},

	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.target.on( 'click.fu.popover', $.proxy(this._togglePopover, this));
		} else if (trigger === 'hover') {
			this.elements.target.on( 'mouseover.fu.popover', $.proxy(this._togglePopover, this));
			this.elements.target.on( 'mouseout.fu.popover', $.proxy(this._togglePopover, this));
		} else if (trigger === 'focus') {
			this.elements.target.on( 'focus.fu.popover', $.proxy(this._togglePopover, this));
			this.elements.target.on( 'focusout.fu.popover', $.proxy(this._togglePopover, this));
		}
	},

	_togglePopover () {
		const position = this._getElementAlignment(this.elements.popover[0], this.elements.container[0], this.elements.align[0]);
		const isHidden = this.elements.popover.hasClass('slds-hidden');
		
		this.elements.popover.toggleClass('slds-hidden', !isHidden);
		this.elements.popover.css(position);

		if (isHidden) {
			this.elements.popover.attr('class', this._getClassNames());

			this.elements.wrapper.trigger('shown.fu.popover');
		} else {
			this.elements.wrapper.trigger('hidden.fu.popover');
		}
	}
});

const legacyMethods = {
	show () {
		if (this.elements.popover.hasClass('slds-hidden')) {
			this._togglePopover();
		}
	},

	hide () {
		if (!this.elements.popover.hasClass('slds-hidden')) {
			this._togglePopover();
		}
	},

	toggle () {
		this._togglePopover();
	},

	destroy () {
		this.elements.popover.remove();

		return template;
	}
};

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {
	legacyMethods
});

export default Popover;

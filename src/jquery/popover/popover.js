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

export const PopoverMethods = {
	_onInitialized () {
		this._setElementOptions();
		this._setTrigger();

		this._render();

		this.trigger('initialized');
	},

	_setElementOptions () {
		const target = this.getProperty('target');
		const container = this.getProperty('container');
		const align = this.getProperty('align');

		this.elements.popover = this.template.clone();
		this.elements.target = target || this.elements.wrapper;
		this.elements.container = container || this.elements.wrapper;
		this.elements.align = align || this.elements.target;
	},

	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.target.on( 'click', $.proxy(this.toggle, this));
		} else if (trigger === 'hover') {
			this.elements.target.on( 'mouseover', $.proxy(this.show, this));
			this.elements.target.on( 'mouseout', $.proxy(this.hide, this));
		} else if (trigger === 'focus') {
			this.elements.target.on( 'focus', $.proxy(this.show, this));
			this.elements.target.on( 'focusout', $.proxy(this.hide, this));
		}
	},
	
	_updatePopoverPosition () {
		let position = this.getElementAlignment(this.elements.popover[0], this.elements.container[0], this.elements.align[0]);
		this.elements.popover.css(position);
		
		const isOffscreen = Lib.isOffscreen(this.elements.popover[0], true);
		if (isOffscreen === 'top') {
			position = this.getElementAlignment(this.elements.popover[0], this.elements.container[0], this.elements.align[0], 'bottom');
			this.elements.popover.css(position);
		} else if (isOffscreen === 'bottom') {
			position = this.getElementAlignment(this.elements.popover[0], this.elements.container[0], this.elements.align[0], 'top');
			this.elements.popover.css(position);
		}
		
		this.elements.popover.attr('class', this.getClassNames());
		
		this.elements.popover.toggleClass(this.cssClasses.HIDDEN, this.getState('isHidden'));
	},
	
	_onShow () {
		this._updatePopoverPosition();
	},
	
	_onHide () {
		this._updatePopoverPosition();
	}
};

Lib.merge(Popover.prototype, PopoverCore, Events, State, PopoverMethods, {

	_render () {
		const header = this.elements.popover.find('.slds-popover__header > p');
		const body = this.elements.popover.find('.slds-popover__body');

		if (this.getProperty('header')) {
			header.append( this.getProperty('header') );
		}

		if (this.getProperty('content')) {
			body.append( this.getProperty('content') );
		}

		this.elements.popover.toggleClass(this.cssClasses.HIDDEN, true);
		this.elements.container.append(this.elements.popover);

		this._updatePopoverPosition();
	}

});

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {});

export default Popover;

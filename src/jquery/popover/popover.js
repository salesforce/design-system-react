// POPOVER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './popover-template';

let Popover = function Popover () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

export const PopoverMethods = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.positionedElement = Lib.wrapElement(this.element);
	},
	
	_onRendered () {
		this._setElementOptions();
		this._setTrigger();
		
		// TODO: This is probably not the best way to do this or the best place for it to be
		this.appendTo(this.elements.positionableContainer);
		
		this._updatePosition();
	},

	_setElementOptions () {
		const triggerElement = this.getProperty('target');
		const container = this.getProperty('container');
		const align = this.getProperty('align');

		this.elements.triggerElement = Lib.wrapElement(triggerElement || this.elements.wrapper);
		this.elements.positionableContainer = Lib.wrapElement(container || this.elements.wrapper);
		this.elements.align = Lib.wrapElement(align || this.elements.triggerElement);
	},

	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.triggerElement.on( 'click', $.proxy(this.toggle, this));
		} else if (trigger === 'hover') {
			this.elements.triggerElement.on( 'mouseover', $.proxy(this.show, this));
			this.elements.triggerElement.on( 'mouseout', $.proxy(this.hide, this));
		} else if (trigger === 'focus') {
			this.elements.triggerElement.on( 'focus', $.proxy(this.show, this));
			this.elements.triggerElement.on( 'focusout', $.proxy(this.hide, this));
		}
	},
	
	_onShow () {
		this._updatePosition();
	},
	
	_onHide () {
		this._updatePosition();
	}
};

Lib.merge(Popover.prototype, PopoverCore, Events, DOM, State, PopoverMethods, {
	_render () {
		const body = this.element.find('.slds-popover__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}
		
		return this.element;
	}
});

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {});

export default Popover;

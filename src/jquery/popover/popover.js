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
	
	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);
	
	this._initialize(options);
};

export const PopoverMethods = {
	_onRendered () {
		this._setElementOptions();
		this._setTrigger();
		
		// TODO: This is probably not the best way to do this or the best place for it to be
		this.appendTo(this.elements.container);
		
		this._updatePosition();
	},

	_setElementOptions () {
		const target = this.getProperty('target');
		const container = this.getProperty('container');
		const align = this.getProperty('align');

		this.elements.target = Lib.wrapElement(target || this.elements.wrapper);
		this.elements.container = Lib.wrapElement(container || this.elements.wrapper);
		this.elements.align = Lib.wrapElement(align || this.elements.target);
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
	
	_onShow () {
		this._updatePosition();
	},
	
	_onHide () {
		this._updatePosition();
	}
};

Lib.merge(Popover.prototype, PopoverCore, Events, DOM, State, PopoverMethods, {
	_render () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.popover = Lib.wrapElement(this.element);
		
		const header = this.element.find('.slds-popover__header > p');
		const body = this.element.find('.slds-popover__body');

		if (this.getProperty('header')) {
			header.append(this.getProperty('header'));
		}

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}
		
		return this.element;
	}
});

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {});

export default Popover;

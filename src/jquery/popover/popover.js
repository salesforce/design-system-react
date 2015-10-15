// PILLBOX CONTROL - JQUERY FACADE

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
		this.elements.wrapper.on('click.fu.popover', $.proxy(this._togglePopover, this));

		this._render();

		this.trigger('initialized');
	},

	_render () {
		this.elements.popover = this.template.clone();
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

		this.elements.popover.addClass(this._getNubbinClass());
		this.elements.wrapper.append(this.elements.popover);
	},

	_togglePopover () {
		const position = this._getElementRelativePosition(this.elements.popover[0], this.elements.wrapper[0]);

		if (this.elements.popover.hasClass('slds-hidden')) {
			this.elements.popover.removeClass('slds-hidden');

			this.elements.popover.css({
				top: position.top,
				left: position.left
			});
		} else {
			this.elements.popover.addClass('slds-hidden');
		}
	}
});

const legacyMethods = {

};

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {
	legacyMethods
});

export default Popover;

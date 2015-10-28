// TOOLTIP CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverMethods } from '../popover/popover';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './tooltip-template';

let Tooltip = function Tooltip () {
	const options = this._getOptions(arguments);
	
	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.CONTROL);
	
	this._initialize(options);
};

Lib.merge(Tooltip.prototype, TooltipCore, Events, DOM, State, PopoverMethods, {
	_render () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this.elements.popover = Lib.wrapElement(this.element);
		
		const body = this.elements.popover.find('.slds-tooltip__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}
		
		return this.element;
	}
});

Tooltip = Lib.runHelpers('jquery', CONTROL, Tooltip, {});

export default Tooltip;

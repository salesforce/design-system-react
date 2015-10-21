// TOOLTIP CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverMethods } from '../popover/popover';

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

Lib.merge(Tooltip.prototype, PopoverMethods, TooltipCore, Events, State, {
	_render () {
		const body = this.elements.popover.find('.slds-tooltip__body');

		if (this.getProperty('content')) {
			body.append( this.getProperty('content') );
		}

		this.elements.popover.addClass(this.getClassNames());
		this.elements.container.append(this.elements.popover);
		
		this._updatePopoverPosition();
	}
});

Tooltip = Lib.runHelpers('jquery', CONTROL, Tooltip, {});

export default Tooltip;

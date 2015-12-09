// TOOLTIP CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import TooltipCore, {CONTROL} from '../../core/tooltip';

// Inherited functionality from popover
import { PopoverMethods } from '../popover/popover';

// Traits
import Positionable from '../../traits/positionable';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './tooltip-template';

let Tooltip = function Tooltip () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

Lib.merge(Tooltip.prototype, TooltipCore, Events, DOM, State, PopoverMethods, {
	_render () {
		const body = $(Positionable.getElement(this)).find('.slds-popover__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}
		
		return this.element;
	}
});

Tooltip = Lib.runHelpers('jquery', CONTROL, Tooltip, {});

export default Tooltip;

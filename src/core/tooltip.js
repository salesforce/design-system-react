// POPOVER CONTROL
import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Positionable from '../traits/positionable';
import Disableable from '../traits/disableable';
import Hideable from '../traits/hideable';

// Styles
require('../../scss/components/tooltips/flavors/base/index.scss');

export const CONTROL = 'slds-tooltip';

const TooltipCore = Lib.merge({}, Base, Positionable, Disableable, Hideable, {
	cssClasses: {
		CONTROL: CONTROL
	},

	_defaultProperties: {
		isOpen: false,
		trigger: 'hover', // click, hover, focus, manual
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		align: null // The element the popover will be aligned with
	}
});

export default TooltipCore;

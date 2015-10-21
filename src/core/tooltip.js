// TOOLTIP CONTROL
import * as Lib from '../lib/lib';
import PopoverCore from './popover';

// Styles
// require('../../scss/components/tooltips/flavors/base/index.scss');

export const CONTROL = 'slds-tooltip';

const TooltipCore = Lib.merge({}, PopoverCore, {
	cssClasses: {
		CONTROL: CONTROL
	}
});

export default TooltipCore;

// # Tooltip Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

import PopoverCore from './popover';

export const CONTROL = 'Tooltip';

const TooltipCore = Lib.merge({}, PopoverCore, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-popover slds-popover--tooltip'
	}
});

export default TooltipCore;

// # Radio Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

import CheckboxCore from './checkbox';


export const CONTROL = 'Radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-radio',
		FAUX: 'slds-radio--faux'
	}
});

export default RadioCore;

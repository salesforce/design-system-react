// RADIO CORE

import * as Lib from '../lib/lib';
import CheckboxCore from './checkbox';

// Styles
// require('../../scss/components/forms/flavors/form-element/index.scss');
// require('../../scss/components/forms/flavors/radio/index.scss');

export const CONTROL = 'slds-radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	cssClasses: {
		CONTROL: CONTROL,
		FAUX: 'slds-radio--faux'
	}
});

export default RadioCore;

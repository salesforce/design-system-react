// RADIO CORE

import * as Lib from '../lib/lib';
import CheckboxCore from './checkbox';

// Styles
// require('../../scss/components/forms/flavors/form-element/index.scss');
// require('../../scss/components/forms/flavors/radio/index.scss');

export const CONTROL = 'radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	cssClasses: {
		CONTROL: CheckboxCore.cssClasses.NAMESPACE + CONTROL,
		FAUX: CheckboxCore.cssClasses.NAMESPACE + CONTROL + '--faux'
	}
});

export default RadioCore;

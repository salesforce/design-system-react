// RADIO CONTROL

import * as Lib from '../lib/lib';
import CheckboxCore from './checkbox';

require('../../scss/components/grid-system/flavors/containers/index.scss');
require('../../scss/components/forms/flavors/form-element/index.scss');
require('../../scss/components/forms/flavors/radio/index.scss');

export const CONTROL = 'radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	cssClasses: {
		CONTROL: CheckboxCore.cssClasses.NAMESPACE + CONTROL,
		CONTROL_FAUX: CheckboxCore.cssClasses.NAMESPACE + CONTROL + '--faux'
	}
});

export default RadioCore;

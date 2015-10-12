// RADIO CONTROL

import * as Lib from '../lib/lib';
import CheckboxCore from './checkbox';

export const CONTROL = 'radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	cssClasses: {
		CONTROL: CheckboxCore.cssClasses.NAMESPACE + CONTROL,
		CONTROL_FAUX: CheckboxCore.cssClasses.NAMESPACE + CONTROL + '--faux'
	}
});

export default RadioCore;

// RADIO CONTROL

import * as Lib from '../lib/lib';
import CheckboxCore from './checkbox';

export const CONTROL = 'radio';

const RadioCore = Lib.merge({}, CheckboxCore, {
	cssClasses: {
		CONTROL: CONTROL + '-custom',
		CHECKED: 'checked',
		BLOCK: CONTROL,
		INLINE: CONTROL + '-inline',
		LABEL: CONTROL + '-label',
		ADDON: 'input-group-addon',
		HIGHLIGHT: 'highlight'
	}
});

export default RadioCore;

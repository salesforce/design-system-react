// DATEPICKER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'datepicker';

const DatepickerCore = Lib.merge({}, Base, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	}
});

export default DatepickerCore;

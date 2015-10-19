// DATEPICKER CORE

import * as Lib from '../lib/lib';
import Base from './base';

// require('../../less/datepicker.less');

export const CONTROL = 'datepicker';

const DatepickerCore = Lib.merge({}, Base, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	}
});

export default DatepickerCore;

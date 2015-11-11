// MODAL CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'modal';

const ModalCore = Lib.merge({}, Base, {
	CONTROL,

	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		secondaryBtnText: 'Cancel',
		primaryBtnText: 'Save',
		isOpen: false
	}

});

export default ModalCore;

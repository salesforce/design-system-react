// MODAL CORE

import * as Lib from '../lib/lib';
import Base from './base';

import Openable from '../traits/openable';

// Styles
// require('../../less/modal.less');

export const CONTROL = 'modal';

const ModalCore = Lib.merge({}, Base, Openable, {
	CONTROL,

	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		collection: []
	}

});

export default ModalCore;

// LOADER CONTROL

import * as Lib from './lib';
import Base from './base';

export const CONTROL = 'loader';

const LoaderCore = Lib.extend({}, Base, {
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	__getInitialState () {
		return {
			begin: 1,
			delay: 150,
			end: 8,
			frame: 1
		};
	},

	__initializeOptions (options) {
		this.__setState(options);
	}
});

export default LoaderCore;

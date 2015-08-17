// LOADER CONTROL

import * as Lib from './lib';
import Base from './base';

export const CONTROL = 'loader';

const LoaderCore = Lib.merge({}, Base, {
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_getDefaultState () {
		return {
			begin: 1,
			delay: 150,
			end: 8,
			frame: 1
		};
	},

	_initializeOptions (options) {
		this.setState(options);
	}
});

export default LoaderCore;

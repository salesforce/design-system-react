// LOADER CONTROL

import * as Lib from './lib';
import Base from './base';

export const CONTROL = 'loader';

const LoaderCore = Lib.merge({}, Base, {
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		begin: 1,
		delay: 150,
		end: 8,
		frame: 1
	},

	_initializer () {
		this.setState({
			begin: this.getProperty('begin'),
			delay: this.getProperty('delay'),
			end: this.getProperty('end'),
			frame: this.getProperty('frame')
		});
	}
});

export default LoaderCore;

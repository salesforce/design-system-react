// LOADER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// require('../../less/icons.less');
// require('../../less/loader.less');

export const CONTROL = 'loader';

const LoaderCore = Lib.merge({}, Base, {
	cssClasses: {
		CONTROL: CONTROL,
		ICON: 'fuelux-icon',
		LOADER: 'fuelux-icon-loader'
	},

	// Set the defaults
	_defaultProperties: {
		begin: 1,
		delay: 150,
		end: 8,
		frame: 1,
		svg: false,
		width: '64px',
		height: '64px'
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

// LOADER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Styles
require('../../scss/components/spinners/flavors/base/index.scss');
require('../../scss/components/spinners/flavors/large/index.scss');
require('../../scss/components/spinners/flavors/medium/index.scss');

export const CONTROL = 'loader';

const LoaderCore = Lib.merge({}, Base, {
	cssClasses: {
		CONTROL: CONTROL,
		ICON: 'slds-spinner',
		LOADER: 'slds-spinner--small'
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

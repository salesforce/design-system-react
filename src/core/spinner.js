// SPINNER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// require('../../less/spinner.less');

export const CONTROL = 'spinner';

const SpinnerCore = Lib.merge({}, Base, {
	assets: '/examples/assets/images/spinners/',

	cssClasses: {
		small: Base.cssClasses.NAMESPACE + CONTROL + '--small',
		medium: Base.cssClasses.NAMESPACE + CONTROL + '--medium',
		large: Base.cssClasses.NAMESPACE + CONTROL + '--large'
	},

	fileNames: {
		base: 'slds_' + CONTROL + '.gif',
		brand: 'slds_' + CONTROL + '_brand.gif',
		inverse: 'slds_' + CONTROL + '_inverse.gif'
	},

	// Set the defaults
	_defaultProperties: {
		size: 'medium',
		theme: 'base'
	},

	_initializer () {
		this.setState({
			size: this.getProperty('size'),
			theme: this.getProperty('theme')
		});
	}
});

export default SpinnerCore;

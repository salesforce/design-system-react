// SPINNER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

require('../../scss/components/spinners/flavors/base/index.scss');
require('../../scss/components/spinners/flavors/large/index.scss');
require('../../scss/components/spinners/flavors/medium/index.scss');

export const CONTROL = 'spinner';
const assetsDir = '/assets/design-system/images/spinners/';

const SpinnerCore = Lib.merge({}, Base, {

	cssClasses: {
		small: Base.cssClasses.NAMESPACE + CONTROL + '--small',
		medium: Base.cssClasses.NAMESPACE + CONTROL + '--medium',
		large: Base.cssClasses.NAMESPACE + CONTROL + '--large'
	},

	fileNames: {
		base: assetsDir + 'slds_' + CONTROL + '.gif',
		brand: assetsDir + 'slds_' + CONTROL + '_brand.gif',
		inverse: assetsDir + 'slds_' + CONTROL + '_inverse.gif'
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

// SPINNER CORE

import * as Lib from '../lib/lib';
import Base from './base';

// FIXME: This needs the namespace too, but that will mess up the filenames below

// require('../../scss/components/spinners/flavors/base/index.scss');
// require('../../scss/components/spinners/flavors/large/index.scss');
// require('../../scss/components/spinners/flavors/medium/index.scss');

// TODO: We need to come up with a way to manage assets across the whole project, this hard-coding solution can only be temporary
export const CONTROL = 'slds-spinner';
const assetsDir = '/assets/design-system/images/spinners/';

const SpinnerCore = Lib.merge({}, Base, {
	CONTROL,

	sizes: {
		'small': 'slds-spinner--small',
		'medium': 'slds-spinner--medium',
		'large': 'slds-spinner--large'
	},

	fileNames: {
		base: assetsDir + 'slds_spinner.gif',
		brand: assetsDir + 'slds_spinner_brand.gif',
		inverse: assetsDir + 'slds_spinner_inverse.gif'
	},

	// Set the defaults
	_defaultProperties: {
		size: 'medium',
		theme: 'base'
	}
});

export default SpinnerCore;

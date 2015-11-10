// # Spinner Control
// ### Core

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base).
import Base from './base';

// TODO: We need to come up with a way to manage assets across the whole project, this hard-coding solution can only be temporary
export const CONTROL = 'Spinner';
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

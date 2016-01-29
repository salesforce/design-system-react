// # Badge Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'Badge';

const BadgeCore = Lib.merge({}, Base, {
	CONTROL,

	cssClasses: {
		CONTROL: 'slds-badge'
	},

	themes: {
		'base': '',
		'default': 'slds-theme--default',
		'shade': 'slds-theme--shade',
		'inverse': 'slds-theme--inverse',
		'alt-inverse': 'slds-theme--alt-inverse',
		'info': 'slds-theme--info',
		'success': 'slds-theme--success',
		'warning': 'slds-theme--warning',
		'error': 'slds-theme--error',
		'offline': 'slds-theme--offline',
		'shade-alert-texture': 'slds-theme--shade slds-theme--alert-texture'
	},

	_defaultProperties: {
		text: 'label',
		theme: null
	},

	_getClassNames: function () {
		return classNames(this.cssClasses.CONTROL, this.themes[this.getProperty('theme')]);
	}
});

export default BadgeCore;

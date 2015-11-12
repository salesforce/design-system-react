// # Notification Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// Traits
import Hideable from '../traits/hideable';

export const CONTROL = 'Notify';

const NotificationCore = Lib.merge({}, Base, Hideable, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-notify',
		ALERT: 'slds-notify--alert slds-theme--alert-texture'
	},
	
	themes: {
		success: 'slds-theme--success',
		error: 'slds-theme--error',
		offline: 'slds-theme--offline'
	},

	_defaultProperties: {
		text: 'label',
		theme: null
	},
	
	_getClassNames: function () {
		const hiddenClass = this.getState('isHidden') && this.cssClasses.HIDDEN;

		return classNames(this.cssClasses.CONTROL, this.cssClasses.ALERT, 'slds-theme--inverse-text', this.themes[this.getProperty('theme')], hiddenClass);
	}
});

export default NotificationCore;

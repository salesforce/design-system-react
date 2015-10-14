// NOTIFICATION CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'notification';

const NotificationCore = Lib.merge({}, Base, {
	cssClasses: {
		BASE: 'slds-notify slds-notify--alert slds-theme--alert-texture',
		THEME_ALERT: '',
		THEME_SUCCESS: 'slds-theme--success',
		THEME_ERROR: 'slds-theme--error',
		THEME_OFFLINE: 'slds-theme--offline'
	},

	_defaultProperties: {
		text: 'label',
		theme: 'alert'
	},

	_getClassNameByTheme: function (theme, isHidden) {
		const classNames = [];

		// add base class
		classNames.push(this.cssClasses.BASE);

		// add class for specific theme
		switch (theme.toUpperCase()) {
			case 'ALERT':
			case 'SUCCESS':
			case 'ERROR':
			case 'OFFLINE':
			default:
				classNames.push(this.cssClasses['THEME_' + theme.toUpperCase()]);
				break;
		}

		// add class for state
		if (isHidden === true) {
			classNames.push('slds-hidden');
		}

		return classNames.join(' ');
	}
});

export default NotificationCore;

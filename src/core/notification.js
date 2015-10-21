// NOTIFICATION CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Third party
import classNames from 'classnames';

// Traits
import Hideable from '../traits/hideable';

// Styles
// require('../../scss/components/notifications/flavors/base/index.scss');
// require('../../scss/components/notifications/flavors/alert/index.scss');
// require('../../scss/components/notifications/flavors/toast/index.scss');

export const CONTROL = 'slds-notify';

const NotificationCore = Lib.merge({}, Base, Hideable, {
	cssClasses: {
		CONTROL: CONTROL,
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
		
		return classNames(this.cssClasses.CONTROL, this.cssClasses.ALERT, this.themes[this.getProperty('theme')], hiddenClass);
	}
});

export default NotificationCore;

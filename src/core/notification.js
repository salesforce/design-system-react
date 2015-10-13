// NOTIFICATION CORE

import * as Lib from '../lib/lib';
import Base from './base';

require('../../scss/components/notifications/flavors/base/index.scss');
require('../../scss/components/notifications/flavors/alert/index.scss');
require('../../scss/components/notifications/flavors/toast/index.scss');

export const CONTROL = 'notification';

const NotificationCore = Lib.merge({}, Base, {
	cssClasses: {
		BASE: 'slds-badge',
		THEME_DEFAULT: 'slds-theme--default',
		THEME_SHADE: 'slds-theme--shade',
		THEME_INVERSE: 'slds-theme--inverse'
	},

	_defaultProperties: {
		text: 'label',
		theme: ''
	}
});

export default NotificationCore;

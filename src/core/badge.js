// BADGE CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'badge';

require('../../scss/components/badges/flavors/base/index.scss');


const BadgeCore = Lib.merge({}, Base, {
	cssClasses: {
		BASE: 'slds-badge',
		THEME_DEFAULT: 'slds-theme--default',
		THEME_SHADE: 'slds-theme--shade',
		THEME_INVERSE: 'slds-theme--inverse'
	},

	_defaultProperties: {
		text: 'label',
		theme: ''
	},

	_getClassNameByTheme: function (theme) {
		const classNames = [];

		// add base class
		classNames.push(this.cssClasses.BASE);

		// add class for specific theme
		switch (theme.toUpperCase()) {
			case 'DEFAULT':
			case 'SHADE':
			case 'INVERSE':
			default:
				classNames.push(this.cssClasses['THEME_' + theme.toUpperCase()]);
				break;
		}

		return classNames.join(' ');
	}
});

export default BadgeCore;

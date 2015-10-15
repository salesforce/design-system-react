// BADGE CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Third party
import classNames from 'classnames';

export const CONTROL = 'badge';

const BadgeCore = Lib.merge({}, Base, {
	cssClasses: {
		BASE: 'slds-badge'
	},
	
	themes: {
		'default': 'slds-theme--default',
		shade: 'slds-theme--shade',
		inverse: 'slds-theme--inverse'
	},

	_defaultProperties: {
		text: 'label',
		theme: null
	},

	_getClassNames: function () {
		return classNames(this.cssClasses.BASE, this.themes[this.getProperty('theme')]);
	}
});

export default BadgeCore;

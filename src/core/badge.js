// BADGE CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Third party
import classNames from 'classnames';

export const CONTROL = 'slds-badge';

require('../../scss/components/badges/flavors/base/index.scss');


const BadgeCore = Lib.merge({}, Base, {
	cssClasses: {
		CONTROL: CONTROL
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
		return classNames(this.cssClasses.CONTROL, this.themes[this.getProperty('theme')]);
	}
});

export default BadgeCore;

// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

// Third party
import classNames from 'classnames';

// require('../../scss/components/button-groups/flavors/base/index.scss');
// require('../../scss/components/button-groups/flavors/icon-group/index.scss');
// require('../../scss/components/button-groups/flavors/inverse/index.scss');
// require('../../scss/components/buttons/flavors/base/index.scss');
// require('../../scss/components/buttons/flavors/brand/index.scss');
// require('../../scss/components/buttons/flavors/hint/index.scss');
// require('../../scss/components/buttons/flavors/icon/index.scss');
// require('../../scss/components/buttons/flavors/icon-inverse/index.scss');
// require('../../scss/components/buttons/flavors/icon-more/index.scss');
// require('../../scss/components/buttons/flavors/icon-stateful/index.scss');
// require('../../scss/components/buttons/flavors/inverse/index.scss');
// require('../../scss/components/buttons/flavors/neutral/index.scss');
// require('../../scss/components/buttons/flavors/neutral-icon/index.scss');
// require('../../scss/components/buttons/flavors/stateful/index.scss');
// require('../../scss/components/buttons/flavors/stateful-inverse/index.scss');

export const CONTROL = 'slds-button';

const ButtonCore = Lib.merge({}, Base, Disableable, {
	cssClasses: {
		'CONTROL': CONTROL,
		'NOT_SELECTED': Base.cssClasses.NAMESPACE + 'not-selected',
		'SELECTED': Base.cssClasses.NAMESPACE + 'is-selected'
		// TODO: add button property or check for button parent, inverse, size, etc.
	},
	
	themes: {
		'neutral': CONTROL + '--neutral',
		'brand': CONTROL + '--brand',
		'inverse': CONTROL + '--inverse'
	},
	
	sizes: {
		'small': CONTROL + '--small'
	},
	
	// applied to the button, not the icon/SVG
	iconButtonStyles: {
		'icon-bare': CONTROL + '--icon-bare',
		'icon-container': CONTROL + '--icon-container',
		'icon-border': CONTROL + '--icon-border',
		'icon-border-filled': CONTROL + '--icon-border-filled',
		'icon-small': CONTROL + '--icon-small',
		'icon-more': CONTROL + '--icon-more'
	},

	_defaultProperties: {
		iconStyle: null,
		iconPosition: 'left',
		selected: false,
		size: null,
		theme: null,
		views: []
	},
	
	_getClassNames (isStateful) {
		const selectedClasses = {};
		
		if (isStateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.getProperty('selected');
			selectedClasses[this.cssClasses.SELECTED] = this.getProperty('selected');
		}

		return classNames(this.cssClasses.CONTROL,
			this.sizes[this.getProperty('size')],
			this.themes[this.getProperty('theme')],
			this.iconButtonStyles[this.getProperty('iconStyle')],
			selectedClasses);
	}
	
	// TODO: We usually manage state and throw our own events here, so this will probably need to be expanded for jQuery support
});

export default ButtonCore;

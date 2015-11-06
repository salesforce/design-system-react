// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import SelectableBoolean from '../traits/selectable-boolean';

// Third party
import classNames from 'classnames';

// Styles
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

const ButtonCore = Lib.merge({}, Base, SelectableBoolean, Disableable, {
	// TODO: add button property or check for button parent, inverse, size, etc.
	cssClasses: {
		'CONTROL': CONTROL,
		'NOT_SELECTED': 'slds-not-selected'
	},
	
	themes: {
		'neutral': 'slds-button--neutral',
		'brand': 'slds-button--brand',
		'inverse': 'slds-button--inverse'
	},
	
	sizes: {
		'small': 'slds-button--small'
	},
	
	// applied to the button, not the icon/SVG
	iconButtonStyles: {
		'icon-bare': 'slds-button--icon-bare',
		'icon-border': 'slds-button--icon-border',
		'icon-border-filled': 'slds-button--icon-border-filled',
		'icon-container': 'slds-button--icon-container',
		'icon-inverse': 'slds-button--icon-inverse',
		'icon-more': 'slds-button--icon-more',
		'icon-small': 'slds-button--icon-small',
		'picklist-label': 'slds-picklist__label'
	},

	_defaultProperties: {
		iconStyle: null,
		iconPosition: 'left',
		selected: false,
		size: null,
		theme: null,
		views: [],
		children: []
	},

	_canSelect () {
		if (this.getProperty('disabled')) {
			// Component is disabled, do not allow a toggle to occur.
			return false;
		}

		return true;
	},

	toggle () {
		this._toggleSelected();
	},

	_getClassNames (additionalClasses, isStateful) {
		const selectedClasses = {};
		
		if (isStateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.getProperty('selected');
			selectedClasses[this.cssClasses.SELECTED] = this.getProperty('selected');
		}

		return classNames(this.cssClasses.CONTROL,
			this.sizes[this.getProperty('size')],
			this.themes[this.getProperty('theme')],
			this.iconButtonStyles[this.getProperty('iconStyle')],
			selectedClasses, additionalClasses);
	}
});

export default ButtonCore;

// BUTTON VIEW CORE

import * as Lib from '../lib/lib';
import Base from './base';
import {CONTROL as PARENT_CONTROL} from './button';

// Third party
import classNames from 'classnames';

export const CONTROL = 'slds-buttonview';

const ButtonViewCore = Lib.merge({}, Base, {
	cssClasses: {
		ICON: PARENT_CONTROL + '__icon',
		STATEFUL_ICON: PARENT_CONTROL + '__icon--stateful',
		ASSISTIVE_TEXT: 'slds-assistive-text'
	},
	
	buttonStatefulViewStyles: {
		notSelected: 'slds-text-not-selected',
		selected: 'slds-text-selected',
		selectedHover: 'slds-text-selected-focus'
	},
	
	iconPositions: {
		'left': PARENT_CONTROL + '__icon--left',
		'right': PARENT_CONTROL + '__icon--right'
	},

	moreIcon: 'utility.down',

	iconSizes: {
		'x-small': 'slds-button__icon--x-small'
	},

	_getIconClassNames (additionalClasses) {
		// getIconClassNames is a part of button/button-view because icons within buttons
		// have a completely different set of class than icons on their own
		let iconBaseClass;

		if ( this.getProperty('view') ) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		return classNames(iconBaseClass,
			!!this.getProperty('text') && this.iconPositions[this.getProperty('iconPosition')], additionalClasses);
	}
});

export default ButtonViewCore;

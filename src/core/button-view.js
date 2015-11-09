// BUTTON VIEW CORE

import * as Lib from '../lib/lib';
import Base from './base';
import {CONTROL as PARENT_CONTROL} from './button';

// Third party
import classNames from 'classnames';

export const CONTROL = 'slds-buttonview';

const ButtonViewCore = Lib.merge({}, Base, {
	CONTROL,
	
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

	buttonIconSizes: {
		'x-small': PARENT_CONTROL + '__icon--x-small',
		'small': PARENT_CONTROL + '__icon--small',
		'large': PARENT_CONTROL + '__icon--large'
	},

	_getIconClassNames (additionalClasses) {
		// getIconClassNames is a part of button/button-view because icons within buttons
		// have a completely different set of class than icons on their own
		let iconBaseClass;
		let buttonIconSizeClass;

		if ( this.getProperty('view') ) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		if (this.getProperty('iconSize')) {
			buttonIconSizeClass = this.buttonIconSizes[this.getProperty('iconSize')];
		}

		return classNames(iconBaseClass,
			!!this.getProperty('text') && this.iconPositions[this.getProperty('iconPosition')],
			buttonIconSizeClass,
			additionalClasses);
	}
});

export default ButtonViewCore;

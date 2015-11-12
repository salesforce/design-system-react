// # Button View Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'ButtonView';

const ButtonViewCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		ICON: 'slds-button__icon',
		STATEFUL_ICON: 'slds-button__icon--stateful',
		ASSISTIVE_TEXT: 'slds-assistive-text'
	},
	
	buttonStatefulViewStyles: {
		notSelected: 'slds-text-not-selected',
		selected: 'slds-text-selected',
		selectedHover: 'slds-text-selected-focus'
	},
	
	iconPositions: {
		'left': 'slds-button__icon--left',
		'right': 'slds-button__icon--right'
	},

	moreIcon: 'utility.down',

	buttonIconSizes: {
		'x-small': 'slds-button__icon--x-small',
		'small': 'slds-button__icon--small',
		'large': 'slds-button__icon--large'
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
